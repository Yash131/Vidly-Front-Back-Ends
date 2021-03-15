import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { Label } from "ng2-charts";
import { AdminPanelService } from "../service/admin-panel.service";
@Component({
  selector: "app-admin-panel",
  templateUrl: "./admin-panel.component.html",
  styleUrls: ["./admin-panel.component.scss"],
})
export class AdminPanelComponent implements OnInit, AfterViewInit {
  basicInfos: any;
  isLoading: boolean = false;
  movieArr = [];
  quantityArr = [];

  // bar cart

  barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [        {
        ticks: {
          beginAtZero: true,
          max: 30,

        },
      },],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 50,

          },
        },
      ],
    },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
      },
    },
  };

  barChartLabels: Label[] = [];
  barChartType: ChartType = "horizontalBar";
  barChartLegend = true;
  barChartPlugins = [pluginDataLabels];

  barChartData: ChartDataSets[] = [];
  movieData: any;

  constructor(private adminService: AdminPanelService) {}

  ngOnInit(): void {
    this.getBasicInfo();
  }

  ngAfterViewInit() {}

  getBasicInfo() {
    this.isLoading = true;
    this.adminService.siteAnalytics().subscribe((res: any) => {
      this.basicInfos = res;
      this.movieData = res?.movieQntyData;
      console.log(this.movieData);
      this.graphdataLoder();
      this.isLoading = false;
    });
  }

  graphdataLoder() {
    if (this.basicInfos) {
      this.isLoading = true;
      this.basicInfos.movieQntyData.forEach((element) => {
        this.movieArr.push(element.title);
        this.quantityArr.push(element.numberInStock);
      });

      this.barChartData = [{ data: this.quantityArr, label: "Quantity" }];
      this.barChartLabels = this.movieArr;

      console.log(this.barChartData, this.barChartLabels);
      this.isLoading = false;
    }
  }
}
