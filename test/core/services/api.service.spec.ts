import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiService } from '../../../src/app/core/services/api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get()', () => {
    it('should make a GET request to the given URL', () => {
      const mockData = { id: 1, name: 'Test' };
      service.get<typeof mockData>('/api/test').subscribe(data => expect(data).toEqual(mockData));
      const req = httpMock.expectOne('/api/test');
      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });

    it('should pass HttpParams to the request', () => {
      const params = new HttpParams().set('all', 'true');
      service.get<unknown[]>('/api/test', params).subscribe();
      const req = httpMock.expectOne(r => r.url === '/api/test');
      expect(req.request.params.get('all')).toBe('true');
      req.flush([]);
    });
  });

  describe('post()', () => {
    it('should make a POST request with the correct body', () => {
      const body = { name: 'Test' };
      const mockResponse = { id: 1, name: 'Test' };
      service.post<typeof mockResponse>('/api/test', body).subscribe(data => expect(data).toEqual(mockResponse));
      const req = httpMock.expectOne('/api/test');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(body);
      req.flush(mockResponse);
    });

    it('should pass custom headers', () => {
      const headers = new HttpHeaders({ Authorization: 'Bearer token' });
      service.post<unknown>('/api/test', {}, headers).subscribe();
      const req = httpMock.expectOne('/api/test');
      expect(req.request.headers.get('Authorization')).toBe('Bearer token');
      req.flush({});
    });
  });

  describe('put()', () => {
    it('should make a PUT request with the correct body', () => {
      const body = { name: 'Updated' };
      service.put<typeof body>('/api/test/1', body).subscribe(data => expect(data).toEqual(body));
      const req = httpMock.expectOne('/api/test/1');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(body);
      req.flush(body);
    });
  });

  describe('delete()', () => {
    it('should make a DELETE request', () => {
      service.delete<void>('/api/test/1').subscribe();
      const req = httpMock.expectOne('/api/test/1');
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
