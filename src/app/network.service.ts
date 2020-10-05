import { Injectable, OnDestroy } from "@angular/core";
import { NetworkStatus, PluginListenerHandle, Plugins } from "@capacitor/core";
import { BehaviorSubject, Observable } from "rxjs";

const { Network } = Plugins;

@Injectable({
  providedIn: "root",
})
export class NetworkService implements OnDestroy {
  private handler: PluginListenerHandle;
  private status = new BehaviorSubject<NetworkStatus>(null);

  constructor() {
    this.handler = Network.addListener("networkStatusChange", (status) => {
      console.log("Network status changed", status);
      this.sendStatusChangeMsg(status);
    });
  }

  ngOnDestroy() {
    this.handler.remove();
  }

  public getStatusChangeMsg(): Observable<NetworkStatus> {
    return this.status.asObservable();
  }

  private sendStatusChangeMsg(status: NetworkStatus): void {
    this.status.next(status);
  }
}
