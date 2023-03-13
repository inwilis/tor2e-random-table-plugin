import {RandomTable} from "./RandomTable";
import {Rows} from "./Rows";
import {ensureArraySize} from "./utils";

export class FlatDistributionRandomTable extends RandomTable {

    constructor(header: string[], rows: Rows) {
        super(
            header.length > 0
                ? ensureArraySize(header, rows.columnsCount)
                : [],
            rows)
    }

    renderBody(tbody: HTMLTableSectionElement) {
        this.rows.rows.forEach((row, row_index) => {
            const tr = tbody.createEl("tr", {attr: {"roll": (row_index + 1).toString()}})
            row.forEach((cell, col_index) => tr.createEl("td", {text: cell}))
        })
    }

    configureButton(button: HTMLElement, table: HTMLTableElement) {
        button.addEventListener("click", ev => {
            const rawRoll = this.roll()
            const roll = rawRoll.toString()

            table.querySelectorAll("tr").forEach(el => {
                el.removeClass("highlight")
                if (roll == el.getAttribute("roll")) {
                    el.addClass("highlight")
                }
            })
        })
    }
}