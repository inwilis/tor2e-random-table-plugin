import {RandomTable} from "./RandomTable";
import {Rows} from "./Rows";

export class ImpromptuRandomTable extends RandomTable {

    constructor(containerEl: HTMLElement, header: string[], rows: Rows, params: any) {
        super(containerEl, header, rows, params, null)
    }

    renderBody(tbody: HTMLTableSectionElement) {
        this.rows.rows.forEach((row, row_index) => {
            const tr = tbody.createEl("tr", {attr: {"range": this.rollResults.ranges[row_index].toString()}})
            row.forEach((cell) => tr.createEl("td", {text: cell}))
        })
    }

}
