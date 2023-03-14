import {MarkdownPostProcessorContext, parseYaml, Plugin} from 'obsidian';
import {registerIcons} from "./icons";
import {CODE_BLOCK_RANDOM_TABLE, CSS_CLASS_ERROR} from "./constants";
import {Rows} from "./randomtable/Rows";
import {FeatDieRandomTable} from "./randomtable/FeatDieRandomTable";
import {FlatDistributionRandomTable} from "./randomtable/FlatDistributionRandomTable";

export default class Tor2ePlugin extends Plugin {

    async onload() {
        registerIcons();

        this.registerMarkdownCodeBlockProcessor(CODE_BLOCK_RANDOM_TABLE, this.processRandomTableCodeBlock.bind(this))
    }

    onunload() {

    }

    async processRandomTableCodeBlock(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext): Promise<void> {
        const params = {...parseYaml(source)}

        if (params.rows && Array.isArray(params.rows)) {
            try {
                const rows = new Rows(params.rows)
                const header = (params.header && Array.isArray(params.header)) ? params.header : []

                if (params.die && params.die == "feat" && rows.minRoll == 1 && rows.maxRoll == 12) {
                    ctx.addChild(new FeatDieRandomTable(el, header, rows))
                } else {
                    ctx.addChild(new FlatDistributionRandomTable(el, header, rows))
                }

            } catch (e) {
                el.createSpan({text: e, cls: CSS_CLASS_ERROR})
            }
        }
    }
}
