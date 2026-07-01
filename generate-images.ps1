# Generate all required PNG image assets using System.Drawing
Add-Type -AssemblyName System.Drawing
$out = "d:\files\files\ly\website\tianrunhy\images"
$outGb = "D:\文件\文件\ly\网站\tianrunhy\images"
Add-Type -AssemblyName System.Drawing

function New-Hero($path, $w, $h) {
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $gfx = [System.Drawing.Graphics]::FromImage($bmp)
  $gfx.SmoothingMode = "AntiAlias"
  $gfx.InterpolationMode = "HighQualityBicubic"
  $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
  $grad = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.Color]::FromArgb(255,15,15,20), [System.Drawing.Color]::FromArgb(255,5,5,8), 135)
  $gfx.FillRectangle($grad, $rect)
  # radial blobs
  $b1 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(180,232,33,39))
  $gfx.FillEllipse($b1, ([int]($w*0.5)), 0, [int]($w*1.0), [int]($h*1.2))
  $b2 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(120,0,194,255))
  $gfx.FillEllipse($b2, ([int](-$w*0.1)), ([int](-$h*0.1)), [int]($w*0.8), [int]($h*0.8))

  # dotted grid lines
  for ($x = 0; $x -lt $w; $x += 40) {
    for ($y = 0; $y -lt $h; $y += 40) {
      $gfx.FillEllipse((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(28,255,255,255))), $x-1, $y-1, 2, 2)
    }
  }

  # circuit pattern
  $pn = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(40,232,33,39)), 1.5
  for ($i = 0; $i -lt 8; $i++) {
    $x0 = Get-Random -Minimum 0 -Maximum $w
    $y0 = Get-Random -Minimum 0 -Maximum $h
    $x1 = $x0 + (Get-Random -Minimum -300 -Maximum 300)
    $y1 = $y0 + (Get-Random -Minimum -300 -Maximum 300)
    $gfx.DrawLine($pn, $x0, $y0, $x1, $y1)
    $gfx.DrawEllipse($pn, $x1-4, $y1-4, 8, 8)
  }

  # phone silhouettes
  $p2 = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(28,255,255,255)), 2
  $phW = [int]($h*0.55); $phH = [int]($h*0.62)
  $gfx.DrawRectangle($p2, [int]($w*0.18), [int]($h*0.18), $phW, $phH)
  $gfx.DrawRectangle($p2, [int]($w*0.55), [int]($h*0.22), $phW, $phH)
  $gfx.DrawRectangle($p2, [int]($w*0.34), [int]($h*0.45), $phW, $phH)

  $gfx.Dispose()
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "Generated: hero-1.png"
}

function New-News($path, $w, $h, $hue) {
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $gfx = [System.Drawing.Graphics]::FromImage($bmp)
  $gfx.SmoothingMode = "AntiAlias"
  $gfx.InterpolationMode = "HighQualityBicubic"

  $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
  $c1 = [System.Drawing.Color]::FromArgb(255, ([int](10+$hue*5)), 15, 35)
  $c2 = [System.Drawing.Color]::FromArgb(255, ([int](20+$hue*8)), 30, 60)
  $grad = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $c1, $c2, 135)
  $gfx.FillRectangle($grad, $rect)

  # diagonal stripe
  $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(140, 232, 33, 39))
  $p1 = New-Object System.Drawing.Point 0, 0
  $p2 = New-Object System.Drawing.Point ([int]($w*0.6)), 0
  $p3 = New-Object System.Drawing.Point 0, ([int]($h*0.6))
  $gfx.FillPolygon($brush, @($p1,$p2,$p3))

  # dot pattern
  for ($x = 0; $x -lt $w; $x += 32) {
    for ($y = 0; $y -lt $h; $y += 32) {
      $gfx.FillEllipse((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(30,255,255,255))), $x-1, $y-1, 2, 2)
    }
  }

  $p = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(80,0,194,255)), 2
  $gfx.DrawEllipse($p, [int]($w*0.45), [int]($h*0.45), [int]($w*0.45), [int]($h*0.45))
  $gfx.DrawEllipse($p, [int]($w*0.5), [int]($h*0.5), [int]($w*0.35), [int]($h*0.35))

  $gfx.Dispose()
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "Generated: $([System.IO.Path]::GetFileName($path))"
}

function New-CTA($path, $w, $h) {
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $gfx = [System.Drawing.Graphics]::FromImage($bmp)
  $gfx.SmoothingMode = "AntiAlias"
  $gfx.InterpolationMode = "HighQualityBicubic"
  $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
  $grad = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.Color]::FromArgb(255,40,5,5), [System.Drawing.Color]::FromArgb(255,10,10,15), 135)
  $gfx.FillRectangle($grad, $rect)

  $b1 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(120,232,33,39))
  $gfx.FillEllipse($b1, [int]($w*0.1), [int]($h*0.2), [int]($w*0.6), [int]($h*1.0))
  $b2 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(100,0,194,255))
  $gfx.FillEllipse($b2, [int]($w*0.5), [int]($h*0.5), [int]($w*0.6), [int]($h*1.0))

  $gfx.Dispose()
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "Generated: cta-bg.png"
}

function New-OG($path, $w, $h) {
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $gfx = [System.Drawing.Graphics]::FromImage($bmp)
  $gfx.SmoothingMode = "AntiAlias"
  $gfx.InterpolationMode = "HighQualityBicubic"
  $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
  $grad = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.Color]::FromArgb(255,10,10,12), [System.Drawing.Color]::FromArgb(255,5,5,7), 135)
  $gfx.FillRectangle($grad, $rect)

  $b1 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(180,232,33,39))
  $gfx.FillEllipse($b1, -100, [int]($h*0.1), [int]($w*0.7), [int]($h*1.4))

  $font = New-Object System.Drawing.Font "Arial", 96, ([System.Drawing.FontStyle]::Bold)
  $tb = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
  $gfx.DrawString("TIANRUN", $font, $tb, 80, [int]($h*0.3))
  $font2 = New-Object System.Drawing.Font "Arial", 60, ([System.Drawing.FontStyle]::Bold)
  $gfx.DrawString("HENGYUAN TECH", $font2, (New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255,170,170,175))), 80, [int]($h*0.55))
  $font3 = New-Object System.Drawing.Font "Arial", 36
  $gfx.DrawString("Privacy-first mobile apps for a global audience", $font3, (New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255,200,200,210))), 80, [int]($h*0.75))

  $gfx.Dispose()
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "Generated: og-cover.png"
}

function New-Favicon($path, $size) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $gfx = [System.Drawing.Graphics]::FromImage($bmp)
  $gfx.SmoothingMode = "AntiAlias"
  $gfx.InterpolationMode = "HighQualityBicubic"
  $rect = New-Object System.Drawing.Rectangle 0, 0, $size, $size
  $grad = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.Color]::FromArgb(255,232,33,39), [System.Drawing.Color]::FromArgb(255,163,17,21), 135)
  $gfx.FillRectangle($grad, $rect)
  $font = New-Object System.Drawing.Font "Arial", [int]($size*0.7), ([System.Drawing.FontStyle]::Bold)
  $tb = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = "Center"; $sf.LineAlignment = "Center"
  $gfx.DrawString("T", $font, $tb, (New-Object System.Drawing.RectangleF 0, 0, $size, $size), $sf)
  $gfx.Dispose()
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "Generated: favicon.png"
}

# Use ASCII junction path for Windows GDI
$outAscii = "C:\tianrunhy_images"

# Run all generators
New-Hero (Join-Path $outAscii "hero-1.png") 1920 1080
New-News (Join-Path $outAscii "news-1.png") 800 500 1
New-News (Join-Path $outAscii "news-2.png") 800 500 2
New-News (Join-Path $outAscii "news-3.png") 800 500 3
New-CTA (Join-Path $outAscii "cta-bg.png") 1920 700
New-OG (Join-Path $outAscii "og-cover.png") 1200 630
New-Favicon (Join-Path $outAscii "favicon.png") 64

Get-ChildItem "d:\files\files\ly\website\tianrunhy\images" | Format-Table Name, Length
