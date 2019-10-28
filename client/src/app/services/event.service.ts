import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class EventService {

  constructor(private toastr: ToastrService) { }

  showSuccess(msg: string) {
    this.toastr.success(msg);
  }

  showWarning(msg: string) {
    this.toastr.warning(msg);
  }

  showError(msg: string) {
    this.toastr.error(msg);
  }

  showLoading(show: boolean) {
    if (document && document.getElementById('loading-div')) {
      if (show)
        document.getElementById('loading-div').style.display = 'block';
      else
        document.getElementById('loading-div').style.display = 'none';
    }
  }
}