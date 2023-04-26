import {MarkdownPostProcessorContext, parseYaml, Plugin} from 'obsidian';
import {registerIcons} from "./icons";
import {Rows} from "./randomtable/Rows";
import {FeatDieRandomTable} from "./randomtable/FeatDieRandomTable";
import {ImpromptuRandomTable} from "./randomtable/ImpromptuRandomTable";
import {MersenneTwister19937, Random} from "random-js";

export default class Tor2ePlugin extends Plugin {

    private random: Random

    async onload() {
        this.random = new Random(MersenneTwister19937.autoSeed())
        registerIcons();

        this.registerMarkdownCodeBlockProcessor("tor2e-random-table", this.processRandomTableCodeBlock.bind(this))
    }

    onunload() {

    }

    async processRandomTableCodeBlock(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext): Promise<void> {
        const params = {...parseYaml(source)}

        if (params.rows && Array.isArray(params.rows) && params.rows.length > 0) {
            try {
                const rows = new Rows(params.rows)
                const header = (params.header && Array.isArray(params.header)) ? params.header : []

                if (params.die && params.die == "feat") {
                    ctx.addChild(new FeatDieRandomTable(this.random, el, header, rows, params))
                } else {
                    ctx.addChild(new ImpromptuRandomTable(this.random, el, header, rows, params))
                }

            } catch (e) {
                el.createSpan({text: e, cls: "tor2e-error"})
            }
        } else {
            el.createSpan({text: "Error: Random table must contain a list of rows", cls: "tor2e-error"})
        }
    }
}
