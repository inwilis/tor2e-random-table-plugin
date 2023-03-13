import {RandomTable} from "./RandomTable";
import {Rows} from "./Rows";
import {setIcon} from "obsidian";
import {ensureArraySize} from "./utils";

export class FeatDieRandomTable extends RandomTable {

    constructor(header: string[], rows: Rows) {
        super(
            (header.length == 0 && rows.columnsCount == 3)
                ? ["Feat Die Roll", "Result", "Description"]
                : ensureArraySize(header, rows.columnsCount),
            rows);
    }

    getTableClass(): string {
        return super.getTableClass() + " feat-die";
    }

    renderBody(tbody: HTMLTableSectionElement) {
        this.rows.rows.forEach((row, row_index) => {
            const tr = tbody.createEl("tr", {attr: {"roll": this.rows.rollsForRows[row_index].join(",")}})
            row.forEach((cell, col_index) => {
                this.createCell(tr, cell, col_index)
            })
        })
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

    private createCell(parent: HTMLTableRowElement, text: string, column: number) {
        const td = parent.createEl("td", {text: text});
        if (column == 0) {
            if (text == "G") {
                td.addClass("gandalf-rune")
                setIcon(td, "gandalf-rune")
            } else if (text == "E") {
                td.addClass("eye-of-sauron")
                setIcon(td, "eye-of-sauron")
            }
        }
    }

}
