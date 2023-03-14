import {Rows} from "./Rows";
import {setIcon} from "obsidian";
import {randomIntFromInterval} from "./utils";

export class RandomTable {
    readonly header: string[]
    readonly rows: Rows

    constructor(header: string[], rows: Rows) {
        this.header = header;
        this.rows = rows;
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

            const button = el.createEl("span", {href: "#", cls: "randomtable-roll-button"})
            setIcon(button, "dices")

            this.configureButton(button, table)
        }
    }

    configureButton(button: HTMLElement, table: HTMLTableElement) {
        button.addEventListener("click", ev => {
            const rawRoll = this.roll()
            const roll = rawRoll.toString()

            table.querySelectorAll("tr").forEach(el => {
                el.removeClass("highlight")
                if ((el.getAttribute("roll") || "").split(",").includes(roll)) {
                    el.addClass("highlight")
                }
            })
        })
    }

    getTableClass(): string {
        return "randomtable"
    }

    renderBody(tbody: HTMLTableSectionElement) {
        // abstract
    }

}
