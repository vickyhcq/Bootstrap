// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Components;
using BootstrapBlazor.Shared.Common;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.Extensions.Localization;
using Microsoft.JSInterop;

namespace BootstrapBlazor.Shared.Samples;

/// <summary>
/// 
/// </summary>
public partial class Floatings
{
    /// <summary>
    /// 1
    /// </summary>
    private bool Visible01 { get; set; }
    private Placement Placement01 = Placement.Right;
    private readonly Dictionary<Placement, string> Dots = new()
    {
        { Placement.Top, "left: calc((50% - 10px) - 1rem); top: 0px;" },
        { Placement.TopStart, "left: calc((50% - 70px) - 1rem); top: 0px;" },
        { Placement.TopEnd, "left: calc((50% + 50px) - 1rem); top: 0px;" },
        { Placement.Bottom, "left: calc((50% - 10px) - 1rem); bottom: 0px;" },
        { Placement.BottomStart, "left: calc((50% - 70px) - 1rem); bottom: 0px;" },
        { Placement.BottomEnd, "left: calc((50% + 50px) - 1rem); bottom: 0px;" },
        { Placement.Right, "top: calc((50% - 10px) - 1rem); right: min(50px, 5%);" },
        { Placement.RightStart, "top: calc((50% - 70px) - 1rem); right: min(50px, 5%);" },
        { Placement.RightEnd, "top: calc((50% + 50px) - 1rem); right: min(50px, 5%);" },
        { Placement.Left, "top: calc((50% - 10px) - 1rem); left: min(50px, 5%);" },
        { Placement.LeftStart, "top: calc((50% - 70px) - 1rem); left: min(50px, 5%);" },
        { Placement.LeftEnd, "top: calc((50% + 50px) - 1rem); left: min(50px, 5%);" },
    };

    /// <summary>
    /// 2
    /// </summary>
    private ElementWrapper Wrapper02 { get; set; } = new();
    private bool Visible0201 { get; set; }
    private Button Button02 = new();
    private bool Visible0202 { get; set; }

    /// <summary>
    /// 3
    /// </summary>
    [Inject]
    [NotNull]
    private IStringLocalizer<Foo>? LocalizerFoo { get; set; }
    private bool Visible03 { get; set; }

    [NotNull]
    private List<Foo>? Items { get; set; }

    /// <summary>
    /// 4
    /// </summary>
    /// <param name="e"></param>
    private async void ButtonClick0401(MouseEventArgs e) => await Service.Show(new FloatingOption()
    {
        Selecter = ".floating-service",
        Placement = Placement.TopStart,
        Position = Position.Fixed,
        ChildContent = RenderByService,
        ContainerId = "myContainer21",
        //AxisOffset = 0,
        UseFlip = false,
        //ShiftPadding = 0,
        AutoHide = true,
        AutoUpdate = true,
        //UseArrow = false,
        //ArrowOffset = 0,
        //ArrowStyleClass = "",
        Class = "modal-content",
        Style = "width:60rem;",
    });

    private async void ButtonClick0402(MouseEventArgs e) => await Service.Clear();

    private ElementReference Element05 { get; set; }

    private readonly Offset Offset0501 = new();

    private readonly Offset Offset0502 = new();

    private readonly Offset Offset0503 = new();

    private bool Visible0501 { get; set; }

    private bool Visible0502 { get; set; }

    private bool Visible0503 { get; set; }

    private void UpdatePosition0501(MouseEventArgs e)
    {
        Offset0501.Left = (int)e.ClientX;
        Offset0501.Top = (int)e.ClientY;
        Visible0501 = true;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="x"></param>
    /// <param name="y"></param>
    /// <returns></returns>
    [JSInvokable]
    public async Task UpdatePosition0502(int x, int y)
    {
        Offset0502.Left = x;
        Offset0502.Top = y;
        Visible0502 = true;

        await InvokeAsync(StateHasChanged);
    }

    private void UpdatePosition0503(MouseEventArgs e)
    {
        //检测右键单击
        if (e.Button == 2)
        {
            Offset0503.Left = (int)e.ClientX;
            Offset0503.Top = (int)e.ClientY;
            Visible0503 = true;
        }
    }
    private void UpdatePosition0504(MouseEventArgs e)
    {
        if (Visible0503)
        {
            Offset0503.Left = (int)e.ClientX;
            Offset0503.Top = (int)e.ClientY;
            Visible0503 = true;
        }
    }

    private readonly string _script05 = @"
        export function throttle(func, delay) {
            let run = true
            return function () {
                if (!run) return
                run = false 
                setTimeout(() => {
                func.apply(this, arguments)
                run = true
                }, delay)
            }
        }
        export function onThrottledMouseMove(el, interval, interop) {
            el.addEventListener('click', throttle(e => {
                interop.invokeMethodAsync('UpdatePosition0502', e.clientX, e.clientY);
            }, interval));
        }";

    private JSModule<Floatings>? Module05 { get; set; }

    /// <summary>
    /// OnInitialized 方法
    /// </summary>
    protected override void OnInitialized()
    {
        base.OnInitialized();

        Items = Foo.GenerateFoo(LocalizerFoo);
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="firstRender"></param>
    /// <returns></returns>
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await base.OnAfterRenderAsync(firstRender);
        if (firstRender)
        {
            var base64 = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(_script05));
            var jSObjectReference = await JS.InvokeAsync<IJSObjectReference>("import", "data:text/javascript;base64," + base64);

            Module05 = new JSModule<Floatings>(jSObjectReference, this);
            await Module05.InvokeVoidAsync("onThrottledMouseMove", Element05, 200);
        }
    }

    /// <summary>
    /// 
    /// </summary>
    /// <returns></returns>
    public async ValueTask DisposeAsync()
    {
        if (Module05 != null)
        {
            //不知道为什么不能释放
            //await Module05.DisposeAsync();
            await Task.Delay(3000);
            Module05 = null;
        }
    }

    private IEnumerable<AttributeItem> GetAttributes() => new[]
    {
        new AttributeItem() {
            Name = "Anchor",
            Description = Localizer["Att01"].Value,
            Type = "string",
            ValueList = " — ",
            DefaultValue = " — "
        },
        new AttributeItem() {
            Name = "Wrapper",
            Description = Localizer["Att02"].Value,
            Type = "ElementWrapper",
            ValueList = " — ",
            DefaultValue = " — "
        },
        new AttributeItem() {
            Name = "Component",
            Description = Localizer["Att03"].Value,
            Type = "IdComponentBase",
            ValueList = " — ",
            DefaultValue = " — "
        },
        new AttributeItem() {
            Name = "Selecter",
            Description = Localizer["Att04"].Value,
            Type = "string",
            ValueList = " — ",
            DefaultValue = " — "
        },
        new AttributeItem() {
            Name = "Offset",
            Description = Localizer["Att05"].Value,
            Type = "Offset",
            ValueList = " — ",
            DefaultValue = " — "
        },
        new AttributeItem() {
            Name = "Visible",
            Description = Localizer["Att06"].Value,
            Type = "bool",
            ValueList = " — ",
            DefaultValue = " false "
        },
        new AttributeItem() {
            Name = "Placement",
            Description = Localizer["Att07"].Value,
            Type = "Placement",
            ValueList = " — ",
            DefaultValue = " Bottom "
        },
        new AttributeItem() {
            Name = "Position",
            Description = Localizer["Att08"].Value,
            Type = "Position",
            ValueList = " Absolute | Fixed ",
            DefaultValue = " Absolute "
        },
        new AttributeItem() {
            Name = "ChildContent",
            Description = Localizer["Att09"].Value,
            Type = "RenderFragment",
            ValueList = " — ",
            DefaultValue = " — "
        },
        new AttributeItem() {
            Name = "ContainerId",
            Description = Localizer["Att10"].Value,
            Type = "string",
            ValueList = " — ",
            DefaultValue = " — "
        },
        new AttributeItem() {
            Name = "AutoHide",
            Description = Localizer["Att11"].Value,
            Type = "bool",
            ValueList = " — ",
            DefaultValue = " true "
        },
        new AttributeItem() {
            Name = "AutoUpdate",
            Description = Localizer["Att12"].Value,
            Type = "bool",
            ValueList = " — ",
            DefaultValue = " false "
        },
        new AttributeItem() {
            Name = "AxisOffset",
            Description = Localizer["Att13"].Value,
            Type = "int",
            ValueList = " — ",
            DefaultValue = " — "
        },
        new AttributeItem() {
            Name = "UseFlip",
            Description = Localizer["Att14"].Value,
            Type = "bool",
            ValueList = " — ",
            DefaultValue = " false "
        },
        new AttributeItem() {
            Name = "ShiftPadding",
            Description = Localizer["Att15"].Value,
            Type = "int",
            ValueList = " — ",
            DefaultValue = " — "
        },
        new AttributeItem() {
            Name = "UseArrow",
            Description = Localizer["Att16"].Value,
            Type = "bool",
            ValueList = " — ",
            DefaultValue = " false "
        },
        new AttributeItem() {
            Name = "ArrowOffset",
            Description = Localizer["Att17"].Value,
            Type = "int",
            ValueList = " — ",
            DefaultValue = " 0 "
        },
        new AttributeItem() {
            Name = "ArrowStyleClass",
            Description = Localizer["Att18"].Value,
            Type = "string",
            ValueList = " — ",
            DefaultValue = " — "
        },
        new AttributeItem() {
            Name = "Class",
            Description = Localizer["Att19"].Value,
            Type = "string",
            ValueList = " — ",
            DefaultValue = " — "
        },
        new AttributeItem() {
            Name = "Style",
            Description = Localizer["Att20"].Value,
            Type = "string",
            ValueList = " — ",
            DefaultValue = " — "
        },
    };
}
