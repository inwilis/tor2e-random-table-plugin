import {Rows} from "./Rows";
import {MarkdownRenderChild, Notice, setIcon} from "obsidian";
import {ensureArraySize} from "./utils";
import {RollResults} from "./RollResults";
import {NumericRange} from "./NumericRange";
import {Random} from "random-js";

export abstract class RandomTable extends MarkdownRenderChild {

    readonly header: string[]

    readonly rollResults: RollResults

    protected constructor(readonly random: Random, containerEl: HTMLElement, header: string[], readonly rows: Rows, readonly params: any, rollResultTransformer: ((s: string) => string) | null) {
        super(containerEl)
        this.rollResults = new RollResults(rows.rows, rollResultTransformer)
        this.header = ensureArraySize(header, rows.columnsCount)
    }

    onload() {
        this.render(this.containerEl)
    }

    roll(): number {
        return this.random.integer(this.rollResults.minRoll, this.rollResults.maxRoll)
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

            const caption = table.createEl("caption")
            const captionContent = caption.createEl("div", {cls: "caption-content"})

            const button = captionContent.createEl("span", {cls: "clickable-icon"})
            setIcon(button, "dices")

            if (this.params.caption) {
                captionContent.createEl("span", {text: this.params.caption})
            }

            if (this.hasHeader()) {
                const thead = table.createEl("thead")
                const tr = thead.createEl("tr")
                this.header.forEach(h => tr.createEl("th", {text: h}))
            }

            const tbody = table.createEl("tbody")

            this.renderBody(tbody)

            this.configureButton(button, table)
        }
    }

    configureButton(button: HTMLElement, table: HTMLTableElement) {
        button.addEventListener("click", () => {
            const roll = this.roll()
            new Notice(`Rolled ${roll}`, 1500);

            table.querySelectorAll("tr").forEach(el => {
                const rangeAttr = el.getAttribute("range")
                el.toggleClass("highlight", rangeAttr ? new NumericRange(rangeAttr).includes(roll) : false)
            })
        })
    }

    getTableClass(): string {
        return "tor2e-random-table"
    }

    abstract renderBody(tbody: HTMLTableSectionElement): void;

}
