import {Rows} from "./Rows";
import {MarkdownRenderChild, Notice, setIcon} from "obsidian";
import {randomIntFromInterval} from "./utils";
import {CSS_CLASS_ROLL_BUTTON, CSS_CLASS_TABLE} from "../constants";

export abstract class RandomTable extends MarkdownRenderChild {

    protected constructor(containerEl: HTMLElement, readonly header: string[], readonly rows: Rows) {
        super(containerEl)
    }

    onload() {
        this.render(this.containerEl)
    }

    roll(): number {
        return randomIntFromInterval(this.rows.minRoll, this.rows.maxRoll)
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
            const roll = this.roll().toString()

            new Notice(`Rolled ${roll}`, 1500);

            table.querySelectorAll("tr").forEach(el => {
                el.removeClass("highlight")
                if ((el.getAttribute("roll") || "").split(",").includes(roll)) {
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
