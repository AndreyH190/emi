import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicComponent } from './graphic.component';
import { ChartModule } from 'primeng/chart';

describe('GraphicComponent', () => {
  let component: GraphicComponent;
  let fixture: ComponentFixture<GraphicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphicComponent],
      imports: [
        ChartModule
      ]
    });
    fixture = TestBed.createComponent(GraphicComponent);
    component = fixture.componentInstance;
    component.followers = ['asd', 'sad'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create basicData with correct values', () => {
    component.followers = [100 , 200 , 300 , 400 ];
    component.names = ['User1', 'User2', 'User3', 'User4'];

    component.createDataGraphic();

    expect(component.basicData).toEqual({
      labels: ['User1', 'User2', 'User3', 'User4'],
      datasets: [
        {
          label: 'Seguidores',
          data: [100, 200, 300, 400],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)', 
            'rgba(75, 192, 192, 0.2)', 
            'rgba(54, 162, 235, 0.2)', 
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgb(255, 159, 64)', 
            'rgb(75, 192, 192)', 
            'rgb(54, 162, 235)', 
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }
      ]
    });
  });
});
