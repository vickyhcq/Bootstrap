using Microsoft.AspNetCore.Components.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BootstrapBlazor.Components
{
    /// <summary>
    /// 
    /// </summary>
    public partial class GraphView
    {
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        protected override Task InvokeInitAsync() => InvokeVoidAsync("init", Id);

        private async Task OnMousedown(string type, MouseEventArgs args)
        {
            await InvokeVoidAsync("addNode", Id, type, args);
        }
    }
}
