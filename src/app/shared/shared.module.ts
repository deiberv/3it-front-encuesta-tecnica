import { NgModule } from '@angular/core';
import { SharedLibsModule } from './shared-libs.module';
import { ApplicationConfigService } from './config/application-config.service';
import {NgxWebstorageModule} from 'ngx-webstorage';


@NgModule({
  declarations: [
  ],
  imports: [
    SharedLibsModule,
    NgxWebstorageModule.forRoot()
  ],
  exports: [
    SharedLibsModule
  ],
  providers: [
    ApplicationConfigService
  ]
})
export class SharedModule { }
