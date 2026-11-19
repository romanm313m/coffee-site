# Кадрирует сгенерированные кадры: срезает нижнюю полосу с водяным знаком сервиса.
# Оригиналы сохраняются в public/images/source/.

Add-Type -AssemblyName System.Drawing

function Crop-Image {
    param(
        [string]$Source,
        [string]$Destination,
        [int]$CropBottom,
        [int]$Quality = 86
    )

    $img = [System.Drawing.Image]::FromFile($Source)
    try {
        $height = $img.Height - $CropBottom
        $rect = New-Object System.Drawing.Rectangle 0, 0, $img.Width, $height
        $bmp = New-Object System.Drawing.Bitmap $img.Width, $height
        try {
            $g = [System.Drawing.Graphics]::FromImage($bmp)
            try {
                $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $g.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, $img.Width, $height), $rect, [System.Drawing.GraphicsUnit]::Pixel)
            } finally { $g.Dispose() }

            $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
            $params = New-Object System.Drawing.Imaging.EncoderParameters 1
            $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]$Quality)
            $bmp.Save($Destination, $codec, $params)
        } finally { $bmp.Dispose() }
    } finally { $img.Dispose() }
}

$root = 'C:\coffee\public\images'
$source = Join-Path $root 'source'
New-Item -ItemType Directory -Force -Path $source | Out-Null

# Оригиналы сохраняем как есть
Copy-Item (Join-Path $root 'hero.jpg') (Join-Path $source 'hero.jpg') -Force
Copy-Item (Join-Path $root 'interior.jpg') (Join-Path $source 'interior.jpg') -Force

# Кадрируем: водяной знак занимает нижние ~8% кадра
Crop-Image -Source (Join-Path $source 'hero.jpg') -Destination (Join-Path $root 'hero.jpg') -CropBottom 180
Crop-Image -Source (Join-Path $source 'interior.jpg') -Destination (Join-Path $root 'interior.jpg') -CropBottom 150

Get-ChildItem $root -File | Select-Object Name, Length | Format-Table -AutoSize
Add-Type -AssemblyName System.Drawing
foreach ($f in @('hero.jpg', 'interior.jpg')) {
    $i = [System.Drawing.Image]::FromFile((Join-Path $root $f))
    Write-Output "$f -> $($i.Width)x$($i.Height)"
    $i.Dispose()
}
