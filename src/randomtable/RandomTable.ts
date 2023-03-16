import {Rows} from "./Rows";
import {MarkdownRenderChild, Notice, setIcon} from "obsidian";
import {ensureArraySize, randomIntFromInterval} from "./utils";
import {CSS_CLASS_ROLL_BUTTON, CSS_CLASS_TABLE} from "../constants";
import {RollResults} from "./RollResults";
import {NumericRange} from "./NumericRange";

export abstract class RandomTable extends MarkdownRenderChild {

    readonly header: string[]

    readonly rollResults: RollResults

    protected constructor(containerEl: HTMLElement, header: string[], readonly rows: Rows, readonly params:any, rollResultTransformer: ((s: string) => string) | null) {
        super(containerEl)
        this.rollResults = new RollResults(rows.rows, rollResultTransformer)
        this.header = ensureArraySize(header, rows.columnsCount)
    }

    onload() {
        this.render(this.containerEl)
    }

    roll(): number {
        return randomIntFromInterval(this.rollResults.minRoll, this.rollResults.maxRoll)
    }

    hasRows(): boolean {
        return this.rows.columnsCount > 0 && this.rows.length() > 0
    }

    hasHeader(): boolean {
        return this.header.length > 0 && this.header.some(s => s)
    }

    render(el: HTMLElement) {
        if (this.hasRows()) {
            const table = el.createEl("table", {cls: this.getTableClass()})

            if (this.params.caption) {
                table.createEl("caption", {text: this.params.caption})
            }

            if (this.hasHeader()) {
                const thead = table.createEl("thead")
                const tr = thead.createEl("tr")
                this.header.forEach(h => tr.createEl("th", {text: h}))
            }

            const tbody = table.createEl("tbody")

            this.renderBody(tbody)

            const button = el.createEl("span", {href: "#", cls: CSS_CLASS_ROLL_BUTTON})
            setIcon(button, "dices")

            this.configureButton(button, table)
        }
    }

    configureButton(button: HTMLElement, table: HTMLTableElement) {
        button.addEventListener("click", () => {
            const roll = this.roll()
            new Notice(`Rolled ${roll}`, 1500);

            table.querySelectorAll("tr").forEach(el => {
                el.removeClass("highlight")
                const rangeAttr = el.getAttribute("range")

                if (rangeAttr && new NumericRange(rangeAttr).includes(roll)) {
                    el.addClass("highlight")
                }
            })
        })
    }

    getTableClass(): string {
        return CSS_CLASS_TABLE
    }

    abstract renderBody(tbody: HTMLTableSectionElement): void;

}
