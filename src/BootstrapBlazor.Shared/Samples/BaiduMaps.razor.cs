// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using BootstrapBlazor.Components;
using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Shared.Samples;

/// <summary>
///
/// </summary>
public partial class BaiduMaps
{
    private List<BaiduMarker>? Markers { get; set; }

    [Inject]
    [NotNull]
    private MessageService? MessageService { get; set; }

    private string Version { get; set; } = "fetching";

    /// <summary>
    ///
    /// </summary>
    protected override async Task OnInitializedAsync()
    {
        await base.OnInitializedAsync();
        Markers = new List<BaiduMarker>()
        {
            new BaiduMarker() { Name = "marker1", Point = new MapPoint(116.404, 39.925), Icon = new BaiduMapIcon()
            {
                Size = new MapSize(20, 20), Url = "http://localhost:50853/favicon.png"
            }},
            new BaiduMarker() { Name = "marker2", Point = new MapPoint(116.404, 39.915), EnableClick = true},
            new BaiduMarker() { Name = "marker3", Point = new MapPoint(116.395, 39.935), EnableClick = true},
            new BaiduMarker() { Name = "marker4", Point = new MapPoint(116.415, 39.931), InfoWindow = new BaiduMapInfoWindow()
            {
                Content = "BootStrapBlazor BaiduMap",
                Size = new MapSize(50, 50),
                Title = "BootStrapBlazor"
            }},
        };
        Version = await VersionManager.GetVersionAsync("bootstrapblazor.baidumap");
    }

    private async Task MarkerClick(string name)
    {
        await MessageService.Show(new MessageOption()
        {
            Content = $"{name}被点击了！"
        });
    }
}
