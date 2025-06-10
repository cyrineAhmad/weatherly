import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';
import { By } from '@angular/platform-browser';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Open-Meteo API link', () => {
    const link = fixture.debugElement.query(By.css('a[href="https://open-meteo.com/"]'));
    expect(link).toBeTruthy();
    expect(link.nativeElement.textContent.trim()).toBe('Open-Meteo API');
  });

  it('should render social links with correct hrefs and icons', () => {
    const socialLinks = fixture.debugElement.queryAll(By.css('.social-links a'));
    expect(socialLinks.length).toBe(2);

    const [githubLink, linkedinLink] = socialLinks;

    // GitHub link
    expect(githubLink.nativeElement.getAttribute('href')).toBe(
      'https://github.com/cyrineAhmad/weatherly'
    );
    expect(githubLink.query(By.css('img')).nativeElement.getAttribute('alt')).toBe(
      'GitHub logo'
    );

    // LinkedIn link
    expect(linkedinLink.nativeElement.getAttribute('href')).toBe(
      'https://www.linkedin.com/in/cyrine-ahmad'
    );
    expect(linkedinLink.query(By.css('img')).nativeElement.getAttribute('alt')).toBe(
      'LinkedIn logo'
    );
  });

  it('should apply hover styles on social links', () => {
  const socialLink = fixture.debugElement.query(By.css('.social-link'));
  
  //test class that applies the same styles as hover
  socialLink.nativeElement.classList.add('test-hover');
  fixture.detectChanges();

  const computedStyles = window.getComputedStyle(socialLink.nativeElement);
  expect(computedStyles.backgroundColor).toBe('rgba(110, 142, 251, 0.1)');
});
});