import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'
import "./plugins/axios";
import "leaflet/dist/leaflet.css";
import moshaToast from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';
// import { VueSignalR } from '@quangdao/vue-signalr';



const i18n = createI18n({
  legacy: false,
  locale: 'fa',
  allowComposition: true,
  globalInjection: true,
  messages: {
    en: {
      nameApp: "Sensor Monitoring",
      mode: "Mode",
      language: "Language",
      numberSensor: "Number of sensors",
      number: "Number",
      deviceModel: "Device Model",
      phoneNumber: "Phone Number",
      simCardCharge: "SimCard Charge",
      city: "City",
      registerDate: "Register Date",
      view: "View",
      notFound: "There are no sensors available",
      rawValue: "Raw Value",
      finalValue: "Final Value",
      dateDetermined: "Date Determined",
      numberData: "Number of Data",
      notFoundData: "There are no data available",
      date: "Date",
      value: "Value",
      createDevice: "Create Device",
      ports: "Ports",
      save: "Save",
      connectPort: "Connect Port",
      sensor: "Sensor",
      portName: "Port Name",
      kindPort: "Port Kind",
      back: "Back",
      edit: "Edit",
      imeiModel: "IMEI Model",
      deviceNickName: "Device NickName",
      possition: "Possition",
      search: "Search",
      createSensor: "Create Sensor",
      sensorNickName: "Sensor NickName",
      kind: "Kind",
      unitMeasurement: "Unit Measurement",
      completeInformation: "Please Complete Information",
      errorText: "please try again after later",
      successText: "Operation done successfully",
      successfully: "Successful",
      danger: "Danger",
      error: "Error",
      info: "information",
      numberDevice: "Number of Devices",
      fileExport: "File export successfully",
      sensorList: "List Sensor",
      deviceList: "List Device",
      login: "Login",
      username: "Username",
      password: "Password",
      wrongInput: "Wrong Input,Please Try Again",
      users: "Users",
      logout: "Logout",
      numberUser: "Number Of User",
      firstName: "First Name",
      lastName: "Last Name",
      role: "Role",
      devices: "Devices",
      createUser: "Create User",
      owner: "Owner",
      add: "Add",
      byteNumbers: "Byte Numbers",
      kindProperty: "Kind Property",
      nameProperty: "Name Property",
      startByte: "Start Byte",
      addProperty: "Add Property",
      cancel: "Cancel",
      countDataTable: "Count Data Per Page"
    },
    fa: {
      nameApp: "سامانه رهگیری حسگرها",
      mode: "پس زمینه",
      language: "زبان",
      numberSensor: "تعداد حسگر ها",
      number: "شماره",
      deviceModel: "مدل دستگاه",
      phoneNumber: "شماره تلفن",
      simCardCharge: "شارژ سیم کارت",
      city: "شهر",
      registerDate: "تاریخ ثبت",
      view: "مشاهده",
      notFound: "حسگری موجود نیست.",
      rawValue: "مقدار خام",
      finalValue: "مقدار نهایی",
      dateDetermined: "تاریخ اندازه گیری",
      numberData: "تعداد داده ها",
      notFoundData: "داده ای موجود نیست.",
      date: "تاریخ",
      value: "نتیجه",
      createDevice: "ساخت دستگاه",
      ports: "پورت ها",
      save: "ذخیره",
      connectPort: "اتصال پورت",
      sensor: "حسگر",
      portName: "نام پورت",
      kindPort: "نوع پورت",
      back: "بازگشت",
      edit: "ویرایش",
      imeiModel: "شناسه مودم",
      deviceNickName: "نام اختصاصی دستگاه",
      possition: "موقعیت مکانی",
      search: "جست و جو",
      createSensor: "ساخت حسگر",
      sensorNickName: "نام اختصاصی حسگر",
      kind: "نوع",
      unitMeasurement: "واحد اندازه گیری",
      completeInformation: "لطفا اطلاعات را تکمیل بفرمایید",
      successText: "عملیات با موفقیت انجام شد",
      errorText: "با خطا مواجه شده اید. دوباره تلاش نمایید",
      successfully: "موفقیت آمیز",
      danger: "هشدار",
      error: "خطا",
      info: "اطلاع",
      numberDevice: "تعداد دستگاه ها",
      fileExport: "فایل با موفقیت استخراج شد",
      sensorList: "لیست حسگر ها",
      deviceList: "لیست دستگاه ها",
      login: "ورود کاربران",
      username: "نام کاربری",
      password: "رمز عبور",
      wrongInput: "اطلاعات اشتباه است لطفا دوباره تلاش کنید",
      users: "کاربران",
      logout: "خروج",
      numberUser: "تعداد کاربران",
      firstName: "نام",
      lastName: "نام خانوادگی",
      role: "نقش",
      devices: "دستگاه",
      createUser: "ساخت کاربر",
      owner: "مالک",
      add: "افزودن",
      byteNumbers: "شماره بایت ها",
      kindProperty: "نوع متغیر",
      nameProperty: "نام متغیر",
      startByte: "بایت شروع",
      addProperty: "افزودن متغیر",
      cancel: "لغو",
      countDataTable: "تعداد داده ها در هر صفحه"
    },
  }

})



const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(moshaToast)
// app.use(VueSignalR, { url: 'https://localhost:7110/superherohub' })

app.mount('#app')
