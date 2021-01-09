class Good {
    constructor(id, name, price, popular)
    {
        this.id = id;
        this.name = name;
        this.price = price;
        this.popular = popular;
    }
    render($jQueryElement, popularGoods, popularContainer)
    {
        const $goodContainer = $('<div />', {
            class: 'good',
            id: this.id
        });
        const $goodTitle = $('<p />', {
            text: this.name
        });
        const $goodPrice = $(`<p>Стоимость: <span class="product-price">${this.price}</span> руб.</p>`);
        const $goodBtnAdd = $('<button />', {
            class: 'buygood',
            text: 'Добавить в корзину',
            'data-id': this.id
        });

        //Кнопка удаления товара
        const $goodBtnDelete = $('<button />',{
            class: 'deletegood',
            text: 'Убрать из корзины',
            'data-id': this.id
    });


        //Создаем структуру товара
        $goodTitle.appendTo($goodContainer);
        $goodPrice.appendTo($goodContainer);
        $goodBtnAdd.appendTo($goodContainer);
        $goodBtnDelete.appendTo($goodContainer);
        $goodContainer.appendTo($jQueryElement);

        //Добавление товаров в популярные
        if (this.popular){

            popularGoods.goods.push(this);
            const $goodContainerPopular = $goodContainer.clone();
            $goodContainerPopular
                .attr('id', `popular${popularGoods.goods.length}`)
                    .addClass('popular')
                        .appendTo(popularContainer);

            switch (popularGoods.goods.length) {
                case 1:
                    $goodContainerPopular.addClass('active1');
                    break;
                case 2:
                    $goodContainerPopular.addClass('active2');
                    break;
            }
        }

    }

}