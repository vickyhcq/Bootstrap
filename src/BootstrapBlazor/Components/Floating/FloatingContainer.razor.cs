// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// <see cref="Floating"/> 容器组件
/// </summary>
public partial class FloatingContainer : IDisposable
{
    private readonly Dictionary<string, FloatingContext> _contexts = new();

    /// <summary>
    /// 获得/设置 容器唯一标识编号
    /// </summary>
    [Parameter]
    public string Id { get; init; } = Guid.NewGuid().ToString();

    /// <summary>
    /// 获得/设置 显示样式类
    /// </summary>
    [Parameter]
    public string @Class { get; init; } = "floating-container";

    /// <summary>
    /// 
    /// </summary>
    [Inject]
    private FloatingContainerService? Service { get; set; }

    /// <summary>
    /// 注册浮动控制上下文
    /// </summary>
    /// <returns></returns>
    internal async Task RegisterContext(FloatingContext handler)
    {
        if (!_contexts.ContainsKey(handler.Id))
        {
            _contexts.Add(handler.Id, handler);
            await InvokeAsync(StateHasChanged);
        }
    }

    /// <summary>
    /// 注销浮动控制上下文
    /// </summary>
    /// <returns></returns>
    internal async Task UnregisterContext(FloatingContext handler)
    {
        if (_contexts.ContainsKey(handler.Id))
        {
            _contexts.Remove(handler.Id);
            await InvokeAsync(StateHasChanged);
        }
    }

    /// <summary>
    /// OnInitialized
    /// </summary>
    protected override void OnInitialized()
    {
        Service?.RegisterContainer(this);
    }

    /// <summary>
    /// Dispose 方法
    /// </summary>
    /// <param name="disposing"></param>
    private void Dispose(bool disposing)
    {
        if (disposing)
        {
            Service?.UnregisterContainer(this);
        }
    }

    /// <inheritdoc/>
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}
