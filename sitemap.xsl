<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html>
<head>
<title>Sitemap - DetectHiddenFees.com</title>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#0f172a;color:#e2e8f0;padding:16px;font-size:14px}
h1{font-size:20px;font-weight:700;color:#f8fafc;margin-bottom:6px}
p{color:#94a3b8;font-size:13px;margin-bottom:16px}
table{width:100%;border-collapse:collapse;background:#1e293b;border-radius:8px;overflow:hidden;border-spacing:0}
th{background:#334155;color:#cbd5e1;padding:8px 10px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.03em}
td{padding:6px 10px;border-top:1px solid #334155;font-size:13px;word-break:break-all}
tr:hover td{background:rgba(59,130,246,.08)}
a{color:#60a5fa;text-decoration:none}
a:hover{text-decoration:underline}
.url{color:#e2e8f0;font-size:13px}
.count{background:#2563eb;color:white;padding:2px 8px;border-radius:100px;font-size:11px;font-weight:600}
</style>
</head>
<body>
<h1>XML Sitemap</h1>
<p>DetectHiddenFees.com - <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs - Last updated: <xsl:value-of select="sitemap:urlset/sitemap:url[1]/sitemap:lastmod"/></p>
<table>
<thead><tr><th>URL</th><th>Priority</th><th>Last Modified</th><th>Frequency</th></tr></thead>
<tbody>
<xsl:for-each select="sitemap:urlset/sitemap:url">
<tr>
<td class="url"><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
<td><xsl:value-of select="sitemap:priority"/></td>
<td><xsl:value-of select="sitemap:lastmod"/></td>
<td><xsl:value-of select="sitemap:changefreq"/></td>
</tr>
</xsl:for-each>
</tbody>
</table>
<p style="margin-top:12px;font-size:12px;color:#64748b;">This sitemap is formatted for viewing. Google Search Console reads the raw XML directly.</p>
</body>
</html>
</xsl:template>
</xsl:stylesheet>