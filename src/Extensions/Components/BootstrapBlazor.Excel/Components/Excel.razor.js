import { addLink, addScript } from '../../BootstrapBlazor/modules/utility.js'
import Data from '../../BootstrapBlazor/modules/data.js'

export async function init(id) {
    await addLink('./_content/BootstrapBlazor.Excel/css/luckysheet.plugin.css')
    await addLink('./_content/BootstrapBlazor.Excel/css/luckysheet.css')

    await addScript('./_content/BootstrapBlazor.Excel/js/luckysheet.core.js')
    await addScript('./_content/BootstrapBlazor.Excel/js/luckysheet.plugin.js')

    var options = {
        container: id
    }

    if (luckysheet) {
        luckysheet.create(options)
    }
}

export function dispose(id) {

}
