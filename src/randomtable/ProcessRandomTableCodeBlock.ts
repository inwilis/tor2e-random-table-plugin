import {MarkdownPostProcessorContext, parseYaml} from "obsidian";
import {Rows} from "./Rows";
import {RandomTable} from "./RandomTable";
import {FeatDieRandomTable} from "./FeatDieRandomTable";
import {FlatDistributionRandomTable} from "./FlatDistributionRandomTable";
import {CSS_CLASS_ERROR} from "../constants";

export async function processRandomTableCodeBlock(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext): Promise<void> {
    const params = parseYaml(source) || {}

    if (params.rows && Array.isArray(params.rows)) {
        try {
            let randomTable: RandomTable
            const rows = new Rows(params.rows)
            const header = (params.header && Array.isArray(params.header)) ? params.header : []

            if (params.die && params.die == "feat" && rows.minRoll == 1 && rows.maxRoll == 12) {
                randomTable = new FeatDieRandomTable(header, rows)
            } else {
                randomTable = new FlatDistributionRandomTable(header, rows)
            }

            randomTable.render(el)
        } catch (e) {
            el.createSpan({text: e, cls: CSS_CLASS_ERROR})
        }
    }
}


