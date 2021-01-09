class PopularGoods {
    constructor(id)
    {
        this.id = id;
        this.goods = []
    }

    render(container){
        let $popularGoods = $('<div />', {
            id: this.id
        });

        $popularGoods.appendTo(container);
    }
}