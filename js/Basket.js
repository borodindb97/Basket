class Basket {
    constructor(idBasket)
    {
        this.id = idBasket;
        this.amount = 0; //Общая стоимость товаров
        this.basketItems = []; //Массив для хранения товаров

        //Получаем товары
        // this.getItems();
    }

    getItems()
    {
        let appendId = `#${this.id}_items`;

        //Вариант 1
        //let self = this;

        //Имитация ajax запроса
        //Получили данные
        const data = {
            result: 1,
            basket: [
                {
                id_product: 123,
                price: 400
                 }
            ],
            amount: 400
        };

        let $basketData = $('<div />', {
            id: 'basket_data'
        });

        this.amount = data.amount; //Общая стоимость товаров в корзине

        for(let i = 0; i < data.basket.length; i++)
        {
            this.basketItems.push(data.basket[i]);
        }

        console.log(this.amount);

        $basketData.append(`<p>Всего товаров: ${this.basketItems.length}</p>`);
        $basketData.append(`<p>Общая стоимость: ${this.amount}</p>`);

        $basketData.appendTo(appendId);
        

    //     $.ajax({
    //         type: 'GET',
    //         url: './json/get_items.json',
    //         context: this, //Вариант 2
    //         dataType: 'json',
    //         success: function (data) {
    //             let $basketData = $('<div />', {
    //                 id: 'basket_data'
    //             });

    //             this.amount = data.amount; //Общая стоимость товаров в корзине

    //             for(let i = 0; i < data.basket.length; i++)
    //             {
    //                 this.basketItems.push(data.basket[i]);
    //             }

    //             $basketData.append(`<p>Всего товаров: ${this.basketItems.length}</p>`);
    //             $basketData.append(`<p>Общая стоимость: ${this.amount}</p>`);

    //             $basketData.appendTo(appendId);
    //         },
    //         error: function (err) {
    //             console.log('Ошибка', err);
    //         }
    //     });

    }

    render($jQuerySelector)
    {
        const $basketDiv = $('<div />', {
            id: this.id,
            text: 'Корзина'
    });

        const $basketItemsDiv = $('<div />', {
            id: `${this.id}_items`
        });

        const $basketDrop = $('<div />', {
            id: `${this.id}_drop`,
            text: 'Drop your good here!'
        });

        $basketItemsDiv.appendTo($basketDiv);
        $basketDrop.appendTo($basketDiv);
        $basketDiv.appendTo($jQuerySelector);

    }

    addProduct(idProduct, price){
        let goodItem = {
            id_product: idProduct,
            price //Так как ES6 price: price
        };

        this.amount += price;

        this.basketItems.push(goodItem);
        this.refresh(); //Перерисовываем корзину
    }

    remove(idProduct)
    {
        //Удаления товара из корзины
        for (let i = 0; i < this.basketItems.length; i++) {
            if (idProduct == this.basketItems[i].id_product){
                this.amount -= this.basketItems[i].price;
                this.basketItems.splice(i, 1);
                break
            }
        }

        this.refresh();
    }

    refresh()
    {
        let $basketData = $('#basket_data');
        $basketData.empty(); //Очищаем содержимое контейнера
        $basketData.append(`<p>Всего товаров: ${this.basketItems.length}</p>`);
        $basketData.append(`<p>Общая стоимость: ${this.amount}</p>`);

        //Для отладки
        console.log(this.basketItems);
    }

    drop()
    {
        $(`#${this.id}_drop`).droppable({
            drop: (event, ui) => {
                const item = $(ui.draggable[0]);
                const itemPrice = parseInt(item.find('.product-price').text());
                const itemId = item.attr('id');
                this.addProduct(itemId, itemPrice);

                item.removeAttr('style');

            }
        })
    }
}