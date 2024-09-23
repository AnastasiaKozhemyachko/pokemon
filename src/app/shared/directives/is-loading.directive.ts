import {ComponentFactoryResolver, Directive, inject, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {LoadingComponent} from "../components/loading/loading.component";

@Directive({
  selector: '[appIsLoading]',
  standalone: true
})
export class IsLoadingDirective {
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly templateRef = inject(TemplateRef);
  private readonly componentFactoryResolver = inject(ComponentFactoryResolver);

  @Input() set appIsLoading(isLoading: boolean) {
    this.viewContainerRef.clear();
    if (isLoading) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingComponent);
      this.viewContainerRef.createComponent(componentFactory);
    } else {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

}
