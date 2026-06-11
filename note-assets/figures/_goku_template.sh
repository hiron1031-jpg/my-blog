make_goku() {
  local file="$1"; local title="$2"; local r1="$3"; local r2="$4"; local r3="$5"
  cat > "$file" << HTML
<!DOCTYPE html>
<html lang="ja"><head><meta charset="UTF-8"><style>
body { margin:0; background:#fff; font-family:"Yu Gothic","Meiryo",sans-serif; }
.wrap { width:900px; padding:18px 24px 22px; }
.label { font-size:22px; margin-bottom:8px; }
table { width:850px; border:2.5px solid #000; border-collapse:collapse; }
td { border:none; padding:10px 8px; font-size:21px; text-align:left; width:20%; }
</style></head><body><div class="wrap">
<div class="label">〔${title}〕</div>
<table>
<tr>$(echo "$r1" | awk -F, '{for(i=1;i<=NF;i++) printf "<td>%s，</td>", $i}')</tr>
<tr>$(echo "$r2" | awk -F, '{for(i=1;i<=NF;i++) printf "<td>%s，</td>", $i}')</tr>
<tr>$(echo "$r3" | awk -F, '{n=NF; for(i=1;i<NF;i++) printf "<td>%s，</td>", $i; printf "<td>%s</td>", $NF}')</tr>
</table>
</div></body></html>
HTML
}
