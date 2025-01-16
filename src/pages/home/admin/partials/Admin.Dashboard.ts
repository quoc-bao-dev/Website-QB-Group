import Chart, { ChartItem } from 'chart.js/auto';
import { round } from 'lodash';
import orderService from '../../../../api/orderService';
import { productService } from '../../../../api/productService';
import { Order } from '../../../../interface/order';
import { Product } from '../../../../interface/product';
import QBComponent from '../../../../lib/QBComponent';
import { n, usd } from '../../../../util/productUtils';
import AppLoading from '../../../../components/common/AppLoading';
import categoryService from '../../../../api/categoryService';

interface DashboardAdminState {
    lsBestSelling: Product[];
    lsTopView: Product[];
    lsProduct: Product[];
    lsOrder: Order[];
    isLoading: boolean;
}
class DashboardAdmin extends QBComponent<{}, DashboardAdminState> {
    constructor() {
        super();
        this.state = {
            lsBestSelling: [],
            lsTopView: [],
            lsProduct: [],
            lsOrder: [],
            isLoading: true,
        };
    }
    protected markup: () => string = () => {
        const totalRevenue = this.state.lsProduct.reduce((a, item) => a + item.price * item.sold, 0);
        const totalRevenueInMonth = this.state.lsOrder
            .filter((i) => i.paymentStatus === 'success')
            .reduce((a, item) => a + item.totalAmount, 0);

        const totalRevenueLastMonth = totalRevenue / 1000 - 25000;

        const incPrecentRevn = ((totalRevenueInMonth - totalRevenueLastMonth) / totalRevenueLastMonth) * 100;

        const totalProductSold = this.state.lsOrder.reduce(
            (a, item) => a + item.orderItems.reduce((a, i) => a + i.quantity, 0),
            0
        );

        const totalProductSoldInMonth = 80;
        const incPrecentSold = ((totalProductSold - totalProductSoldInMonth) / totalProductSoldInMonth) * 100;

        if (this.state.isLoading) return new AppLoading().html;
        return /*html*/ `
        <div class="p-5">
        <div class="flex gap-5">
            <!-- item -->
            <div class="p-8 rounded-2xl shadow-xl bg-white">
                <p class="text-sm text-gray-400 pb-2 ">Total Revenue</p>
                <h1 class="text-3xl font-bold">${usd(round(totalRevenue / 1000, 2))}K</h1>
            </div>
            <!-- item -->


            <!-- item -->
            <div class="p-8 rounded-2xl shadow-xl bg-white">
                <p class="text-sm text-gray-400 pb-2 ">Total Revenue In Month</p>
                <h1 class="text-3xl font-bold">${usd(round(totalRevenueInMonth / 1000, 2))}K</h1>
                <p class="text-sm ${incPrecentRevn < 0 ? 'text-red-500' : 'text-green-500'} ">${
            incPrecentRevn > 0 ? '+' : ''
        }${(((totalRevenueInMonth - totalRevenueLastMonth) / totalRevenueLastMonth) * 100).toFixed(2)}%</p>
            </div>
            <!-- item -->


            <!-- item -->
            <div class="p-8 rounded-2xl shadow-xl bg-white min-w-[200px]">
                <p class="text-sm text-gray-400 pb-2 ">Total Product Sold</p>
                <h1 class="text-3xl font-bold">${n(totalProductSold)}</h1>
                <p class="text-sm ${incPrecentSold < 0 ? 'text-red-500' : 'text-green-500'} ">${
            incPrecentSold > 0 ? '+' : ''
        }${(((totalProductSold - totalProductSoldInMonth) / totalProductSoldInMonth) * 100).toFixed(2)}%</p>
            </div>
            <!-- item -->

            



        </div>
           <!-- item -->
           <div class="flex gap-5 mt-10">
                 <div class="p-8 rounded-2xl shadow-xl bg-white w-fit">
                    <canvas id="chart-pie"></canvas>
                    <p class="text-sm text-gray-400 text-center mt-2"> Sold</p>
                </div>
                <div class="p-8 rounded-2xl shadow-xl bg-white w-fit">
                    <canvas id="chart-view"></canvas>
                    <p class="text-sm text-gray-400 text-center mt-2">Demand</p>
                </div>
                 <div class="p-8 rounded-2xl shadow-xl bg-white w-fit">
                    <canvas id="chart-revenue"></canvas>
                    <p class="text-sm text-gray-400 text-center mt-2">Revenue</p>
                </div>
           </div>

           
            <!-- item -->


         <div class="mt-10">
            <h1 class="text-2xl font-semibold text-gray-500">Top Selling Products</h1>
            <swiper-container slides-per-view="3" space-between="" autoplay="{
        'delay': 3000,
        'disableOnInteraction': false
    }" pagination="true" class="w-full ">
               ${this.state.lsBestSelling
                   .map((item) => {
                       return /*html*/ `
                    <!-- item -->
                <swiper-slide class="">
                    <div class="p-8 rounded-2xl shadow-xl bg-white my-8 mx-8">
                        <div class="flex gap-3 items-center">
                        <div class="w-1/3 aspect-[1/1] rounded-lg flex items-center justify-center">
                            <img src="${item.image}"
                                class="w-full object-contain" alt="">
                        </div>
                        <div class="flex flex-col gap-3 h-full">
                            <h3 class="text-base font-semibold text-overflow-ellipsis line-clamp-1">${item.name}</h3>
                            <p class="text-red-800 font-medium">${usd(item.price)}</p>
                            <p class="text-gray-500 text-sm mt-auto">${n(item.sold)} product sold</p>
                        </div>
                    </div>
                    </div>
                </swiper-slide>
                <!-- item -->
                   `;
                   })
                   .join('')}
                
            </swiper-container>
        </div>

        <div class="mt-10">
            <h1 class="text-2xl font-semibold text-gray-500">High Demand Products</h1>
            <swiper-container slides-per-view="3" space-between="" autoplay="1000" pagination="true" class="w-full">
                ${this.state.lsTopView
                    .map((item) => {
                        return /*html*/ `
                    <!-- item -->
                <swiper-slide>
                        <div >
                            <div class="p-8 my-8 mx-8 rounded-2xl shadow-xl bg-white">
                    <div class="flex gap-3 items-center">
                        <div class="w-1/3 aspect-[1/1] rounded-lg flex items-center justify-center">
                            <img src="${item.image}"
                                class="w-full object-contain" alt="">
                        </div>
                        <div class="flex flex-col gap-3 h-full">
                            <h3 class="text-base font-semibold text-overflow-ellipsis line-clamp-1">${item.name}</h3>
                            <p class="text-red-800 font-medium">${usd(item.price)}</p>
                            <p class="text-gray-500 text-sm mt-auto">${n(item.view)} views</p>
                        </div>
                    </div>
                </div>
                        </div>
                </swiper-slide>
                <!-- item -->
                   `;
                    })
                    .join('')}
                
            </swiper-container>

            <div class="mt-10">
                <canvas id="chart-line"></canvas>
           </div>




        
       
        `;
    };

    protected async afterRender(): Promise<void> {
        const lsBestSelling = await productService.getBestSelling();
        lsBestSelling.length = 8;

        const lsTopView = await productService.getTopView();
        lsTopView.length = 8;

        const lsProduct = await productService.getAllProduct();

        const lsOrder = await orderService.getAllOrder();

        this.setState({ lsBestSelling, lsTopView, lsProduct, lsOrder, isLoading: false });

        this.chartSold();
        this.chartView();
        this.chartRevenue();
        this.chartLine();
    }

    private chartSold() {
        if (document.querySelector('#chart-pie') === null) {
            return;
        }
        (async () => {
            const lsProduct = this.state.lsProduct;
            const cate = await categoryService.getCategoryAdmin();
            const lsProd = cate.map((item) => {
                return lsProduct
                    .filter((product) => (product.category as Category)._id === item._id)
                    .reduce((a, b) => a + b.sold, 0);
            });
            const lsName = cate.map((item) => {
                return item.name;
            });

            const data = {
                datasets: [
                    {
                        data: lsProd,
                    },
                ],

                labels: lsName,
            };

            new Chart(document.getElementById('chart-pie')! as ChartItem, {
                type: 'pie',
                data: data,
            });
        })();
    }
    private chartView() {
        if (document.querySelector('#chart-view') === null) {
            return;
        }
        (async () => {
            const lsProduct = this.state.lsProduct;
            const cate = await categoryService.getCategoryAdmin();
            const lsProd = cate.map((item) => {
                return lsProduct
                    .filter((product) => (product.category as Category)._id === item._id)
                    .reduce((a, b) => a + b.view, 0);
            });
            const lsName = cate.map((item) => {
                return item.name;
            });

            const data = {
                datasets: [
                    {
                        data: lsProd,
                    },
                ],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: lsName,
            };

            new Chart(document.getElementById('chart-view')! as ChartItem, {
                type: 'pie',
                data: data,
            });
        })();
    }

    private chartRevenue() {
        if (document.querySelector('#chart-revenue') === null) {
            return;
        }
        (async () => {
            const lsProduct = this.state.lsProduct;
            const cate = await categoryService.getCategoryAdmin();
            const lsProd = cate.map((item) => {
                return lsProduct
                    .filter((product) => (product.category as Category)._id === item._id)
                    .reduce((a, b) => a + b.price * b.sold, 0);
            });
            const lsName = cate.map((item) => {
                return item.name;
            });

            const data = {
                datasets: [
                    {
                        data: lsProd,
                    },
                ],

                labels: lsName,
            };

            new Chart(document.getElementById('chart-revenue')! as ChartItem, {
                type: 'pie',
                data: data,
            });
        })();
    }

    private chartLine() {
        if (document.querySelector('#chart-line') === null) {
            return;
        }
        (async () => {
            const lsProduct = this.state.lsProduct;
            const lsSold = lsProduct.map((item) => {
                return item.sold;
            });

            const lsRevenue = lsProduct.map((item) => {
                return (item.price * item.sold) / 1000;
            });

            const lsName = lsProduct.map((item) => {
                return item.name;
            });

            const data = {
                datasets: [
                    {
                        label: 'Sold product',
                        data: lsSold,
                    },
                    {
                        label: 'Revenue',
                        data: lsRevenue,
                    },
                ],

                labels: lsName,
            };

            new Chart(document.getElementById('chart-line')! as ChartItem, {
                type: 'bar',
                data: data,
            });
        })();
    }
}

export default DashboardAdmin;
