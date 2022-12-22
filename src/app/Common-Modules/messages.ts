export class ResponseMessage {
    public static readonly SEVERITY_SUCCESS = 'success';
    public static readonly SEVERITY_ERROR = 'error';
    public static readonly SEVERITY_WARNING = 'warn';
    public static readonly SEVERITY_INFO = 'info';
    
    public static readonly SUMMARY_SUCCESS = 'Success Message';
    public static readonly SUMMARY_WARNING = 'Warning Message';
    public static readonly SUMMARY_ALERT = 'Alert Message!';
    public static readonly SUMMARY_APPROVED = 'Approved!';
    public static readonly SUMMARY_REJECTED = 'Rejected!';
    public static readonly SUMMARY_REQUIRED = 'Data Required';
    public static readonly SUMMARY_ERROR = 'Error Message';
    public static readonly SUMMARY_INVALID = 'Invalid Credentials!'
    public static readonly SuccessMessage = 'Saved Successfully!';
    public static readonly UploadSucess = 'Uploaded Successfully!';
    public static readonly SubmitMessage = 'Submitted Successfully!';
    public static readonly ErrorMessage = 'Please Contact Administrator!';
    public static readonly WarningMessage = 'Please try after sometime!';
    public static readonly NoRecordMessage = 'No Record Found!';
    public static readonly NoRecForCombination = 'No Record for this combination!';
    public static readonly UpdateMsg = 'Updated Successfully!';
    public static readonly LoginFailed = 'Login failed!! Please enter valid credentails!';
    public static readonly ImageFormatErr = 'Please upload only .png or .jpg or .jpeg format images';
}