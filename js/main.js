$(document).ready(function () {
    //Контейнер с товарами
    let $goodsContainer = $('#goods');

    //Популярные товары
    let popularGoods = new PopularGoods('popularGoods');
    popularGoods.render('#popularContainer');

    let $popularContainer = $('#popularGoods');

    //Создаем товары
    let good1 = new Good(123, 'Коврик для ПК мыши', 400, true);
    good1.render($goodsContainer, popularGoods, $popularContainer);

    let good2 = new Good(124, 'Клавиатура для ПК', 1000, true);
    good2.render($goodsContainer, popularGoods, $popularContainer);

    let good3 = new Good(125, 'ПК игровой', 3000, false);
    good3.render($goodsContainer, popularGoods, $popularContainer);

    let good4 = new Good(126, 'Материнская плата', 900, false);
    good4.render($goodsContainer, popularGoods, $popularContainer);

    let good5 = new Good(127, 'Процессор', 1500, true);
    good5.render($goodsContainer, popularGoods, $popularContainer);

    let good6 = new Good(128, 'Жесткий диск', 500, true);
    good6.render($goodsContainer, popularGoods, $popularContainer);

    let good7 = new Good(129, 'Видеокарта', 800, false);
    good7.render($goodsContainer, popularGoods, $popularContainer);

    //Прокручивание популярных товаров
    //Левая стрелка
    $('#arrowLeft').on('click', function () {


        let firstGood = $('.active1');
        let secondGood = $('.active2');

        if (firstGood.attr('id') === 'popular1'){
            secondGood.removeClass('active2');
            firstGood.removeClass('active1').addClass('active2');
            $(`#popular${popularGoods.goods.length}`).addClass('active1')
        } else {
            secondGood.removeClass('active2');
            firstGood.removeClass('active1').addClass('active2').prev().addClass('active1');
        }

    });

    //Правая стрелка
    $('#arrowRight').on('click', function () {

        let firstGood = $('.active1');
        let secondGood = $('.active2');

        if (secondGood.attr('id') === `popular${popularGoods.goods.length}`){
            firstGood.removeClass('active1');
            secondGood.removeClass('active2').addClass('active1');
            $('#popular1').addClass('active2')
        } else {
            firstGood.removeClass('active1');
            secondGood.removeClass('active2').addClass('active1').next().addClass('active2');
        }

    });

    //Создаем экземпляр корзины
    let basket = new Basket('basket');
    basket.render($('.basket_wrapper'));
    basket.getItems();
    basket.drop();

    //Добавление draggable ко всем товарам
    $('.good').draggable();
    //Чтобы не сбивалось позиционирование популярных товаров
    $('.popular').removeAttr('style');

    //Добавление товара в корзину
    $('.buygood').on('click', function () {
        let idProduct = parseInt($(this).attr('data-id'));
        let price = parseInt($(this).parent().find('.product-price').text());

        basket.addProduct(idProduct, price);
    });

    //Удаление товара
    $('.deletegood').on('click', function () {
        let idGood = parseInt($(this).attr('data-id'));
        console.log(idGood);
        basket.remove(idGood);
    })

    //

});