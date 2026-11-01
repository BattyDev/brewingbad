// Invite-only config: never enables the public promo page's demo button.
// Fill these from the exact distributable ZIP. Capture dates are not download build dates.
window.BREWING_BAD_INVITE = {
  url: '',
  label: 'Download the Windows playtest',
  buildDate: '', // YYYY-MM-DD
  fileSize: '', // e.g. '250 MB'
  sha256: '' // 64 hex characters; Get-FileHash <build.zip> -Algorithm SHA256
};
