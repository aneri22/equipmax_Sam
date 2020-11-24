import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,Subject,BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SwDetailsService {

  localhost = 'http://10.207.54.204:5000/'
 
  _url='/api/softwares';
  posturl = '/api/add';
  _url3="/api/license";
  StypeURL = "/api/stypes";
  SubTypeURL = "/api/subtypes";
  ScategoryURL = "/api/scategory";
  locationtypeURL="/api/locationtype1";
  licensetypeURL="/api/licensetype1";
  addLicenseURL = "/api/addlicen";
  addSuiteLicenseURL = "/api/addSuitelicen";
  singleSoft = "/api/singlesoft";
  singleSuite = "/api/singlesuite";
  selectedSoftLicen = "/api/lilist";
  selectedSuiteLicen = "/api/sulist";
  singlelicen="/api/singlelicense";
  renewLicen="/api/renew";
  UpgradeLicenUrl="/api/UpgradeLicen";
  licenupgradeUrl="/api/licenupgrade";
  AllocURL="/api/alloc";
  InstallURL="/api/instal";
  UserURL = "/api/User";
  WorkstnURL = "/api/workstn";
  HistoryURL="/api/history";
  deleteLicenseURL = "/api/deletelicense";
  softSuiteURL = "/api/addSuite";
  softinfo = "/api/ssoft";
  suitinfo = "/api/ssuite";
  slicenseinfo = "/api/slicense";
  sslicenseinfo = "/api/sslicense";
  newsoftware = "/api/newsoftware";
  newsuite = "/api/newsuite";
  lastID = "/api/lastid";
  last1ID = "/api/last1id";
  upgradesoftware = "/api/upgrade";
  upgradeSuit = "/api/upgradeSuite";
  oldsoftware = "/api/oldsoftware";
  oldsuite = "/api/oldsuite";

  usersURL = "/api/users";
  

  alloclicenseURL = "/api/alloclicense";

  softwarehistory = "/api/softwarehistory";
  suitehistory  = "/api/suitehistory";

  updateread = "/api/updateread";



  // upgradelicense = "/api/upgrade";
  // upgradeSuitLicense = '/api/upgradeSuite';
  publishers= "/api/publishers";
  livunli="/api/livsunli";
  notifications="/api/notifications";
  uwi = "/api/uwi";
  ssuwi = "/api/ssuwi";

  getuserlicense = "/api/userlicense";
  insertuserlicense = "/api/insertuserlicense";

  updatecompliant = "/api/updatecompliant";
  updatecompliantsuite = "/api/updatecompliantsuite";


  updateallocation = "/api/updateallocation";
  updateavailablecount = "/api/updateavailablecount";


  private _notifychange = new Subject<string>();

  private _userallocated = new Subject<string>();


  checknotification$ = this._notifychange.asObservable();

  public isNotificationUpdated: BehaviorSubject<string> = new BehaviorSubject<string>('not changed');


  sendMessge(message: string){
    this._notifychange.next(message);
  }


  checkallocation$ = this._userallocated.asObservable();
  public isUserAlloted: BehaviorSubject<string> = new BehaviorSubject<string>('yes');


  sendUserMessage(message: string){
    this._userallocated.next(message);
  }

  constructor( private http:HttpClient) { }
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  

  getSoft(){
    let myResponse = this.http.get(this._url);
    return myResponse;
  }

  getSingleSoftware(id){
    return this.http.get(this.singleSoft+`/${id}`);
  }

  getSingleSuite(id){
    return this.http.get(this.singleSuite+`/${id}`);
  }

  getSTypes(){
    return this.http.get(this.StypeURL);
  }

  getSubTypes(){
    return this.http.get(this.SubTypeURL);
  }
  getAlloc(){
    return this.http.get(this.AllocURL);
  }

  getUser(){
    return this.http.get(this.UserURL);
  }
  getInstal(){
    return this.http.get(this.InstallURL);
  }
  getHistory(){
    return this.http.get(this.HistoryURL);
  }
  getWorkstn(){
    return this.http.get(this.WorkstnURL);
  }
  getSCategory(){
    return this.http.get(this.ScategoryURL);
  }
  
 getlocationtype1(){
  return this.http.get(this.locationtypeURL);
 }
  getlicensetype1(){
    return this.http.get(this.licensetypeURL);
  }

  getPublishers(){
    return this.http.get(this.publishers);
  }

  postSoft(soft){
    return this.http.post(this.posturl,soft);
  }

  postSoftSuite(suite){
    return this.http.post(this.softSuiteURL,suite);
  }

  getLicen(){
    let myResponse1 = this.http.get(this._url3);
    return myResponse1;
  }

  getSingleLicen(id){
    return this.http.get(this.singlelicen + `/${id}`);
  }

  getSoftwareInfo(id){
    return this.http.get(this.softinfo + `/${id}`);
  }
  getSuiteInfo(id){
    return this.http.get(this.suitinfo + `/${id}`);
  }

  getLincenseInfo(id){
    return this.http.get(this.slicenseinfo+ `/${id}`);
  }

  getSSLicenseInfo(id){
    return this.http.get(this.sslicenseinfo+ `/${id}`);
  }

  getSelectedSoftLicen(id){
    return this.http.get(this.selectedSoftLicen + `/${id}`);
  }
  

  getSelectedSuiteLicen(id){
    return this.http.get(this.selectedSuiteLicen + `/${id}`);
  }

  renewLicense(id,date): Observable<any>{
    return this.http.put(this.renewLicen+`/${id}`, date, this.httpOptions);
  }

  getNewSofwares(id){
    return this.http.get(this.newsoftware+ `/${id}`);
  }

  getNewSuite(id){
    return this.http.get(this.newsuite+ `/${id}`);
  }


  getLicenupg(id){
    return this.http.get(this.licenupgradeUrl + `/${id}`);
  }

  getLastId(){
    return this.http.get(this.lastID);
  }
  getLast1Id() {
    return this.http.get(this.last1ID);
  }
  public getSoftwareDetails(): any {
    let myResponse = this.http.get(this._url);
    return myResponse;
  }

  // upgradeLicense(id,license) {
  //   return this.http.put(this.upgradelicense + `/${id}`, license);
  // }

  // upgradeSuiteLicense(id,license){
  //   return this.http.put(this.upgradeSuitLicense + `/${id}`,license);
  // }

  
upgradeSoftware(id, software) {
  return this.http.put(this.upgradesoftware + `/${id}`, software);
}

postOldSoftware(software) {
  return this.http.post(this.oldsoftware, software);
}

postOldSuite(suite) {
  return this.http.post(this.oldsuite, suite);
}

upgradeSuite(id, license) {
  return this.http.put(this.upgradeSuit + `/${id}`, license);
}



  public addLicenses(license): any {
  return this.http.post(this.addLicenseURL, license);
  }

  public addSuiteLicense(license): any {
    return this.http.post(this.addSuiteLicenseURL, license);
  }
  

  deleteLicense(id,licenseobj): Observable<any>{
    return this.http.put(this.deleteLicenseURL+`/${id}`, licenseobj);
  }

  licensedvsunlicensed(){
    return this.http.get(this.livunli);
  }

  getNotifications(){
    return this.http.get(this.notifications);

  }

  getuwi(id){
    return this.http.get(this.uwi + `/${id}`);
  }
       
  getssuwi(id){
    return this.http.get(this.ssuwi + `/${id}`);
  }


  getusers() {

    return this.http.get(this.usersURL);
    
    }
    
    getAlloclicense() {
    
    return this.http.get(this.alloclicenseURL);
    
    }

  getSoftwareHistory(id){
    return this.http.get(this.softwarehistory + `/${id}`);
  }

  getSuiteHistory(id){
    return this.http.get(this.suitehistory + `/${id}`);
  }

  updateReadStatus(id,license){
    return this.http.put(this.updateread + `/${id}`,license);
  }

  getUserLicense(){
    return this.http.get(this.getuserlicense);
  }


  insertUserLicense(uiobj){
    return this.http.post(this.insertuserlicense, uiobj);
  }

  updateCompliant(id,val){
    return this.http.put(this.updatecompliant + `/${id}`, val);
  }

  updateCompliantSuite(id,val){
    return this.http.put(this.updatecompliantsuite + `/${id}`, val);
  }

  updateAllocation(id,val){
    return this.http.put(this.updateallocation + `/${id}`, val);
  }
  
  updateAvailabeCount(id,val){
    return this.http.put(this.updateavailablecount + `/${id}`, val);
  }
  
}
