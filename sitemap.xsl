<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" version="5.0" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html lang="en">
<head>
<title>Sitemap &mdash; DetectHiddenFees.com</title>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;color:#e2e8f0;padding:24px}
h1{font-size:1.5rem;font-weight:700;color:#f8fafc;margin-bottom:8px}
p{color:#94a3b8;font-size:.85rem;margin-bottom:20px}
table{width:100%;border-collapse:collapse;background:#1e293b;border-radius:12px;overflow:hidden}
th{background:#334155;color:#cbd5e1;padding:10px 14px;text-align:left;font-size:.8rem;text-transform:uppercase;letter-spacing:.04em}
td{padding:8px 14px;border-top:1px solid #334155;font-size:.85rem;word-break:break-all}
tr:hover td{background:rgba(59,130,246,.08)}
a{color:#60a5fa;text-decoration:none}
a:hover{color:#93c5fd;text-decoration:underline}
.url{color:#e2e8f0}
.count{background:#2563eb;color:white;padding:2px 10px;border-radius:100px;font-size:.75rem;font-weight:600}
@media(max-width:600px){td,th{padding:6px 8px;font-size:.75rem}}
</style>
</head>
<body>
<h1>XML Sitemap &mdash; DetectHiddenFees.com</h1>
<p>Total URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> &mdash; Last updated: <xsl:value-of select="sitemap:urlset/sitemap:url[1]/sitemap:lastmod"/></p>
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
</body>
</html>
</xsl:template>
</xsl:stylesheet>