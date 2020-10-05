import { Component } from "@angular/core";
import { NetworkService } from "../network.service";

import { Plugins } from "@capacitor/core";
const { Toast } = Plugins;

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  public connected = true;

  constructor(private networkService: NetworkService) {
    this.setupSubscriptions();
  }

  private setupSubscriptions() {
    this.networkService.getStatusChangeMsg().subscribe((res) => {
      if (res) {
        this.connected = res.connected;
      }
      this.showNetworkChgToast();
    });
  }

  private async showNetworkChgToast() {
    await Toast.show({
      text: `Network Connectivity: ${this.connected ? "Online" : "Offline"}`,
      duration: "short",
    });
  }
}
