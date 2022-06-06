// Copyright (c) Argo Zhang (argo@163.com). All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// Website: https://www.blazor.zone or https://argozhang.github.io/

namespace BootstrapBlazor.Components;

/// <summary>
/// <see cref="Floating"/> 容器服务类
/// </summary>
internal class FloatingContainerService : IDisposable
{
    private readonly Dictionary<string, FloatingContainer> _containers = new();

    /// <summary>
    /// 容器是否已注册
    /// </summary>
    /// <param name="containerId"></param>
    /// <returns></returns>
    public bool ContainerHasRegistered(string? containerId)
        => !string.IsNullOrWhiteSpace(containerId) && _containers.ContainsKey(containerId);

    /// <summary>
    /// 注册容器
    /// </summary>
    /// <param name="container"></param>
    /// <exception cref="DuplicateWaitObjectException"></exception>
    public void RegisterContainer(FloatingContainer container)
    {
        if (_containers.ContainsKey(container.Id))
        {
            throw new ArgumentException("A container instance with the same ID number already exists.", nameof(container));
        }

        _containers.Add(container.Id, container);
    }

    /// <summary>
    /// 注销容器
    /// </summary>
    /// <param name="container"></param>
    public void UnregisterContainer(FloatingContainer container)
    {
        if (_containers.ContainsKey(container.Id))
        {
            _containers.Remove(container.Id);
        }
    }

    /// <summary>
    /// 注册浮动控制上下文
    /// </summary>
    /// <param name="context"></param>
    /// <returns></returns>
    /// <exception cref="KeyNotFoundException"></exception>

    public async void RegisterContext(FloatingContext context)
    {
        var key = context.State.ContainerId;
        if (string.IsNullOrWhiteSpace(key) || !_containers.ContainsKey(key))
        {
            throw new KeyNotFoundException(nameof(context));
        }

        await _containers[key].RegisterContext(context);
    }

    /// <summary>
    /// 注销浮动控制上下文
    /// </summary>
    /// <param name="context"></param>
    /// <returns></returns>
    /// <exception cref="KeyNotFoundException"></exception>

    public async void UnregisterContext(FloatingContext context)
    {
        var key = context.State.ContainerId;
        if (!string.IsNullOrWhiteSpace(key) && _containers.ContainsKey(key))
        {
            await _containers[key].UnregisterContext(context);
        }
    }

    /// <summary>
    /// Dispose 方法
    /// </summary>
    /// <param name="disposing"></param>
    private void Dispose(bool disposing)
    {
        if (disposing)
        {
            _containers.Clear();
        }
    }

    /// <inheritdoc/>
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}
