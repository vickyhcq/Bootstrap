import { addLink, addScript } from '../../BootstrapBlazor/modules/utility.js'
import Data from '../../BootstrapBlazor/modules/data.js'

export async function init(id) {
    await addLink('./_content/BootstrapBlazor.ExcelEditor/css/plugins/pluginsCss.css')
    await addLink('./_content/BootstrapBlazor.ExcelEditor/css/plugins/plugins.css')
    await addLink('./_content/BootstrapBlazor.ExcelEditor/iconfont/iconfont.css')

    await addLink('./_content/BootstrapBlazor.ExcelEditor/css/luckysheet.css')

    await addScript('./_content/BootstrapBlazor.ExcelEditor/lib/plugins/plugin.js')

    await addScript('./_content/BootstrapBlazor.ExcelEditor/lib/luckysheet.umd.js')

    var options = {
        container: id
    }

    if (luckysheet) {
        luckysheet.create(options)
    }
}

export function dispose(id) {

}
