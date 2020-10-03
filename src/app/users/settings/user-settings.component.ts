import { Component, OnInit, ViewChild, Type } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../models/user.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Globals } from '../../globals2';
import { Location } from '@angular/common';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ngx-img-cropper';


@Component({
 // moduleId: module.id,
  templateUrl: 'user-settings.component.html',
  styleUrls: ['user-settings.component.css'],
})

export class UserSettingsComponent implements OnInit {
  user: User;

  public imageUploader: FileUploader;
  settingsForm: FormGroup;
  errorMessage: string;

  image: string;
  imageUrl: string;
  biolength: number;
  thisFile: File;
  avatarChanged: boolean;
  tempName: string;
  localImageUrl: string;
  maxFileSize: number;

  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  // Cropper
  chosenFile: string;
  cropperSettings: CropperSettings;
  data: any;

  @ViewChild('cropper') cropper: ImageCropperComponent;
  constructor(
    public userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private globals: Globals,
    private alocation: Location): void {

    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 200;
    this.cropperSettings.height = 200;
    this.cropperSettings.keepAspect = false;
    this.cropperSettings.croppedWidth = 600;
    this.cropperSettings.croppedHeight = 600;
    this.cropperSettings.canvasWidth = 500;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.minWidth = 100;
    this.cropperSettings.minHeight = 100;
    this.cropperSettings.rounded = true;
    this.cropperSettings.minWithRelativeToResolution = false;
    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
    this.cropperSettings.noFileInput = true;
    this.data = {};
  }




  // updateDisplay() {
  //     console.log('Done uploading');
  //     this.imageUrl = this.globals.avatars + '/' + this.user.id + '/' + this.image;
  // }
  // private formatBytes(bytes, decimals?) {
  //   if (bytes === 0) { return '0 Bytes'; }
  //   const k = 1024,
  //     dm = decimals || 2,
  //     sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  //     i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  // }

  // sendData() {
  //   //  this.imageUploader.addToQueue(this.data.image);
  //   // console.log('cropper: ' + JSON.stringify())
  // }

  myInit(): void {

    this.maxFileSize = 5 * 1024 * 1024;
    if (!this.user) {
      this.router.navigate(['/']);
    }
    console.log('This user id: ' + this.user.id);
    const urlWithQuery = this.globals.postavatars + '?id=' + this.user.id;
    console.log('after url query defined.');
    //  this.imageUploader = new FileUploader({url: urlWithQuery});

    // this.imageUploader = new FileUploader({
    //     url: urlWithQuery,
    //     disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
    //     formatDataFunctionIsAsync: true,
    //     formatDataFunction: async (item) => {
    //       return new Promise( (resolve, reject) => {
    //         resolve({
    //           name: item._file.name,
    //           length: item._file.size,
    //           contentType: item._file.type,
    //           date: new Date()
    //         });
    //       });
    //     }
    //   });

    this.imageUploader = new FileUploader({
      url: urlWithQuery,
      maxFileSize: this.maxFileSize,
      // allowedMimeType: ['image/jpeg', 'image/png', 'image/jpg', 'image/gif' ]
    },
    );


    this.imageUploader.onAfterAddingFile = (fileItem) => {
      //   const url = (window.URL) ? window.URL.createObjectURL(fileItem._file)
      //     : (window as any).webkitURL.createObjectURL(fileItem._file);
      // this.imageUrl = url;
      // console.log('In build form: onAfterAddingFile: url =' + url);

      // this.imageUploader.queue[0].upload();
      // Instead of uploading this image right away - we are first going to send it to the cropper
      // and then try to send the modified version to the uploader


    };
    this.imageUploader.onWhenAddingFileFailed = (item, filter) => {
      let message = '';
      switch (filter.name) {
        case 'queueLimit':
          message = 'Queue Limit surpassed';
          break;
        case 'fileSize':
      //    message = 'The file: ' + item.name + ' is ' +
            // this.formatBytes(item.size) +
            // ', which exceeds the maximum filesize of:  ' +
            // this.formatBytes(this.maxFileSize) + '. Please resize this image or choose a different file';
          break;
        case 'mimeType':
          message = 'Your avatar image needs to be a Jpeg, Jpg, PNG or Gif file-type.';
          break;
        default:
          message = 'Error uploading the image';
          break;
      }

      alert(message);

    };

    this.imageUploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('item complete.');
      this.avatarChanged = true;
      //  this.imageUrl = null;
      this.tempName = this.imageUploader.queue[0].file.name;
      this.image = this.tempName;
      this.imageUrl = this.globals.avatars + '/' + this.user.id + '/avatar.jpg';
      this.imageUploader.queue[0].remove();
      //  this.updateDisplay();
    };


    //  Here I am using the formBuilder to build my form controls
    this.settingsForm = this.fb.group({
      favoritecolor: [''],
      imageUploader: '',
      username: [this.user.username, [Validators.required, Validators.minLength(3)]],
      firstname: [this.user.firstname, [Validators.required, Validators.minLength(3)]],
      lastname: [this.user.lastname, [Validators.required, Validators.minLength(3)]],
      email: [this.user.email, [Validators.required,
      Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
      bio: [this.user.bio, [Validators.maxLength(400)]]
    });
    this.biolength = 0;
    if (this.user.bio) {
      this.biolength = this.user.bio.length;
    }
    this.settingsForm.get('bio').valueChanges.subscribe(value => {
      if (value) {
        this.biolength = value.length;
        console.log('The bio changed: ' + value);
      }
    });
  }

  ngOnInit(): void {

    const idFromURL = this.activatedRoute.snapshot.params.id;

    if (idFromURL) {
     // this.user = this.userService.getUserFromMemoryById(idFromURL);

      if (this.user) {
        this.image = this.user.avatar_filename;
        if (this.image) {
          console.log('including an image with this avatar');
          this.imageUrl = this.globals.avatars + '/' + this.user.id + '/' + this.user.avatar_filename;
        } else { this.imageUrl = null; }
      }
    } else {
      this.router.navigate(['/']);
    }

    this.myInit();
  }



  useThis(): void {


    const nameParts = this.chosenFile.split('.');
    nameParts.pop();
    const name = nameParts.join();
    console.log('Chosen File: ' + name);

    const blob = this.dataURItoBlob(this.data.image);
    this.tempName = name + new Date().getTime() + '.jpg';
    const fakeFile = new File([blob], this.tempName);


    this.imageUploader.addToQueue([fakeFile]);
    this.imageUploader.queue[1].upload();

    this.imageUrl = this.globals.avatars + '/' + this.user.id + '/' + this.tempName;
  }




  populateForm(): void {

  }

  cancel(): void {
    this.alocation.back();
  }
  submitSettings(): void {


    // No need to save the settings, if they haven't changed, or they're invalid
    if (this.settingsForm.valid && (this.settingsForm.dirty || this.avatarChanged)) {
      console.log('In submitSettings');
      console.log('settingsForm.value: ' + JSON.stringify(this.settingsForm.value));
      const settingsObject = Object.assign({}, this.user, this.settingsForm.value);

      if (this.avatarChanged) {
        this.useThis();
        // const nameParts = this.chosenFile.split('.');
        // nameParts.pop();
        // const name = nameParts.join();

        // settingsObject.avatar_filename = this.tempName;
        // settingsObject.avatar_URL = '';
      }
      // If the logged in user is the same as the user being edit - then let's update the model
      // so that the loggged in user model has the new info
      if (this.userService.getCurrentUser().id === this.user.id) {
       // this.userService.resetCurrentUser(settingsObject);
      }




    }
  }


  dataURItoBlob(dataURI): Blob {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    const byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }


    return new Blob([ab], { type: mimeString });

  }



  /**
   * Used to send image to second cropper
   *
   */
  fileChangeListener($event): void {
    const image: any = new Image();
    const file: File = $event.target.files[0];
    this.chosenFile = file.name;
    const myReader: FileReader = new FileReader();
    const that = this;
    this.avatarChanged = true;

    myReader.onloadend = (loadEvent: any) => {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
      console.log('In Listener: ' + image);

    };

    myReader.readAsDataURL(file);
  }


}
