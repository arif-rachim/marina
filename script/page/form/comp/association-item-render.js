module.exports = (items,renderer) => {
    return items.map(data => `<button class="btn btn-primary btn-sm btn-item" data-id="${data._id}">${renderer(data)}</button>`).join('');
}