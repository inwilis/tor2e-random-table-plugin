import {MarkdownPostProcessorContext, parseYaml, Plugin} from 'obsidian';
import {registerIcons} from "./icons";
import {CODE_BLOCK_RANDOM_TABLE, CSS_CLASS_ERROR} from "./constants";
import {Rows} from "./randomtable/Rows";
import {FeatDieRandomTable} from "./randomtable/FeatDieRandomTable";
import {ImpromptuRandomTable} from "./randomtable/ImpromptuRandomTable";

export default class Tor2ePlugin extends Plugin {

    async onload() {
        registerIcons();

        this.registerMarkdownCodeBlockProcessor(CODE_BLOCK_RANDOM_TABLE, this.processRandomTableCodeBlock.bind(this))
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
                    ctx.addChild(new FeatDieRandomTable(el, header, rows))
                } else {
                    ctx.addChild(new ImpromptuRandomTable(el, header, rows))
                }

            } catch (e) {
                el.createSpan({text: e, cls: CSS_CLASS_ERROR})
            }
        } else {
            el.createSpan({text: "Error: Random table must contain a list of rows", cls: CSS_CLASS_ERROR})
        }
    }
}
