import { UserService } from './../../../core/services/user/user.service';
import { CategoriesService } from './../../../core/services/categories/categories.service';
import { Component, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexTooltip,
  ApexFill,
  ApexResponsive,
} from 'ng-apexcharts';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';
import { HeaderDashboard } from 'src/app/core/models/header-dashboard';

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis | ApexYAxis[];
  legend: ApexLegend;
  tooltip: ApexTooltip;
  responsive: ApexResponsive[];
  fill: ApexFill;
  labels: string[];
};

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  @ViewChild('chart') chart: ChartComponent | any;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions1: Partial<ChartOptions> | any;
  public chartOptionsZ: Partial<ChartOptions> | any;
  public chartOptions3: Partial<ChartOptions> | any;
  public layoutWidth: string = '1';

  constructor(
    private categoriesService: CategoriesService,
    // private articleService: ArticleService,
    // private capteurService: CapteurService,
    private userService: UserService,
    private dashboardService: DashboardService // private emplacementService: EmplacementsService
  ) {
    this.chartOptions1 = {
      series: [
        {
          name: 'series1',
          data: [50, 75, 50, 75, 50, 75, 100],
          color: '#ff9b44',
        },
        {
          name: 'series2',
          data: [95, 70, 40, 65, 40, 45, 41],
          color: '#fc6075',
        },
      ],
      chart: {
        height: 350,
        type: 'line',
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
    };

    this.chartOptionsZ = {
      series: [
        {
          name: 'series1',
          data: [50, 75, 50, 75, 50, 75, 100],
          color: '#ff9b44',
        },
        {
          name: 'series2',
          data: [95, 70, 40, 65, 40, 45, 41],
          color: '#fc6075',
        },
      ],
      chart: {
        height: 350,
        type: 'line',
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
    };
  }

  allCategorie: any = [];
  allArticle: any = [];
  allCapteur: any = [];
  allUser: any = [];
  dataChartOne: any;
  dataChartTwo: any;
  headerDashboard: HeaderDashboard = {} as HeaderDashboard;
  statCat: any;
  getHeader() {
    this.dashboardService.getHeaderDashboard().subscribe((res) => {
      this.headerDashboard = res;
    });
  }

  getCatogityStat() {
    this.dashboardService.getCategoryOffreDashboard().subscribe((res) => {
      this.statCat = res;
      const keysArray = Object.keys(this.statCat); // ['key1', 'key2', 'key3']
      const valuesArray = Object.values(this.statCat);
      this.chartOptions3 = {
        series: valuesArray,
        chart: {
          type: 'pie',
          height: 350,
        },
        labels: keysArray,
        colors: ['#ff9b44', '#7367F0', '#28C76F', '#EA5455', '#FFC085'],
        legend: {
          position: 'bottom',
        },
        dataLabels: {
          enabled: true,
          formatter: (val: number, opts: any) => {
            return `${val.toFixed(1)}%`;
          },
        },
        tooltip: {
          y: {
            formatter: (val: number) => {
              return `${val} units`;
            },
          },
        },
      };

      this.chartOptions2 = {
        series: [
          {
            name: 'Net Profit',
            data: valuesArray,
            color: '#ff9b44',
          },
        ],
        chart: {
          type: 'bar',
          height: 350,
        },
        grid: {
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        xaxis: {
          categories: keysArray,
        },
        yaxis: {
          title: {
            text: '$ (thousands)',
          },
        },
        fill: {
          opacity: 1,
        },
      };
      console.log(res);
    });
  }
  ngOnInit() {
    this.getHeader();
    this.getCatogityStat();
    this.categoriesService.getAllCategories().subscribe((res) => {
      this.allCategorie = res;
    });

    // this.articleService.getAllArticles().subscribe((res) => {
    //   this.allArticle = res;
    // });

    // this.capteurService.getAllCapteurs().subscribe((res) => {
    //   this.allCapteur = res;
    // });

    this.userService.getAll().subscribe((res) => {
      this.allUser = res;
    });

    // this.emplacementService.getAllEmplacementsTop5().subscribe((res) => {
    //   console.log(res);

    //   this.dataChartOne = res;
    //   const categories = this.dataChartOne.map(
    //     (item: any) => item.stockId.article.name
    //   );
    //   const articleCounts = this.dataChartOne.map((item: any) => item.quantity);

    //   this.chartOptions2 = {
    //     series: [
    //       {
    //         name: 'Article Count',
    //         data: articleCounts,
    //         color: '#ff9b44',
    //       },
    //     ],
    //     chart: {
    //       type: 'bar',
    //       height: 350,
    //     },
    //     grid: {
    //       xaxis: {
    //         lines: {
    //           show: false,
    //         },
    //       },
    //       yaxis: {
    //         lines: {
    //           show: true,
    //         },
    //       },
    //     },
    //     plotOptions: {
    //       bar: {
    //         horizontal: false,
    //         columnWidth: '55%',
    //       },
    //     },
    //     dataLabels: {
    //       enabled: false,
    //     },
    //     stroke: {
    //       show: true,
    //       width: 2,
    //       colors: ['transparent'],
    //     },
    //     xaxis: {
    //       categories: categories,
    //     },
    //     yaxis: {
    //       title: {
    //         text: 'Article Count',
    //       },
    //     },
    //     fill: {
    //       opacity: 1,
    //     },
    //   };
    // });

    // this.articleService.getAllArticlesLowMouvement().subscribe(res=>{
    //   this.dataChartTwo = res
    //   const label = this.dataChartTwo.map((item:any)=>{
    //     return item.articleName
    //   })
    //   const valeur = this.dataChartTwo.map((item:any)=>{
    //     return item.number
    //   })

    //   console.log(label , valeur)

    //   this.chartOptionsZ = {
    //     series: [
    //       {
    //         name: 'Article Count',
    //         data: valeur,
    //         color: '#ff9b44',
    //       },
    //     ],
    //     chart: {
    //       type: 'bar',
    //       height: 350,
    //     },
    //     grid: {
    //       xaxis: {
    //         lines: {
    //           show: false,
    //         },
    //       },
    //       yaxis: {
    //         lines: {
    //           show: true,
    //         },
    //       },
    //     },
    //     plotOptions: {
    //       bar: {
    //         horizontal: false,
    //         columnWidth: '55%',
    //       },
    //     },
    //     dataLabels: {
    //       enabled: false,
    //     },
    //     stroke: {
    //       show: true,
    //       width: 2,
    //       colors: ['transparent'],
    //     },
    //     xaxis: {
    //       categories: label,
    //     },
    //     yaxis: {
    //       title: {
    //         text: 'Article Count',
    //       },
    //     },
    //     fill: {
    //       opacity: 1,
    //     },
    //   };
    // })
  }
}
