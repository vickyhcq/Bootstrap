// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

using Microsoft.AspNetCore.Components;

namespace BootstrapBlazor.Components;

/// <summary>
/// <see cref="Floating"/> 组件控制上下文
/// </summary>
public class FloatingContext
{
    internal EventHandler<bool>? FragmentChanged { get; set; }

    /// <summary>
    /// 延迟到组件渲染完成后执行的方法队列
    /// </summary>
    internal Queue<Func<ValueTask>>? ExecuteAfterRenderQueue { get; private set; }

    /// <summary>
    /// 构造函数
    /// </summary>
    private FloatingContext()
    {
        Id = Guid.NewGuid().ToString();
        State = new();
    }

    /// <summary>
    /// 构造函数
    /// </summary>
    /// <param name="id"></param>
    /// <param name="fragment"></param>
    /// <param name="state"></param>
    internal FloatingContext(string id, RenderFragment? fragment, FloatingState state)
    {
        Id = id;
        State = state;
        ChildContent = fragment;
    }

    /// <summary>
    /// 获得/设置 浮动层元素引用
    /// </summary>
    internal ElementReference Element { get; set; }

    /// <summary>
    /// 获得/设置 浮动层唯一编号
    /// </summary>
    internal string Id { get; init; }

    /// <summary>
    /// 获得/设置 浮动组件状态
    /// </summary>
    internal FloatingState State { get; set; }

    /// <summary>
    /// 获得/设置 内层子组件内容 
    /// </summary>
    internal RenderFragment? ChildContent { get; set; }

    /// <summary>
    /// 延迟到组件渲染完成后执行
    /// </summary>
    /// <param name="action"></param>
    internal void ExecuteAfterRender(Func<ValueTask> action)
    {
        if (ExecuteAfterRenderQueue == null)
        {
            ExecuteAfterRenderQueue = new();
            ExecuteAfterRenderQueue.Enqueue(action);
        }
        else if (!ExecuteAfterRenderQueue.Contains(action))
        {
            ExecuteAfterRenderQueue.Enqueue(action);
        }
    }

    /// <summary>
    /// 强制更新内容
    /// </summary>
    /// <param name="visible"></param>
    internal void UpdateFragment(bool visible) => FragmentChanged?.Invoke(null, visible);
}
