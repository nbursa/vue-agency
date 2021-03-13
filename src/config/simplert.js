export default {
  title: "Realday", //string -- title alert
  message: "message", //string -- message alert
  type: "success", //string -- type : info (default), success, warning, error
  customClass: "", //string -- custom class in simplert div
  customIconUrl: "", //string -- custom url custom image icon
  customCloseBtnText: "", //string -- close button text
  customCloseBtnClass: "", //string -- custom class for close button
  onClose: this.onClose, //function -- when close triggered
  useConfirmBtn: false, //boolean -- using confirm button
  customConfirmBtnText: "", //string -- confirm button text
  customConfirmBtnClass: "", //string -- custom class for confirm button
  onConfirm: this.onConfirm, //function -- when confirm button triggered
  disableOverlayClick: false, //boolean -- set to true if you want disable overlay click function
  hideAllButton: false, //boolean -- set to true if you want hide all button
  onOpen: null, //function -- when simplert open will fire this method if available
  showXclose: true //boolean -- show x close button
}
