---
layout: post
title: "Mixed Content (HTTP/HTTPS) – Browser Feedback"
date: 2013-04-06 16:21:01
owner: Reto
tags: [https, mixed content]
---

### Why HTTPS

Serving a website over an encrypted connection (HTTPS) has some advantages:

- Man-in-the-middle attacks become much harder.
- Therefore users trust your website more, which is especially important for e-commerce
- WebSocket connections (wss://) are more [likely to succeed](https://groups.google.com/d/msg/sockjs/wAgVZoN5iC4/VRYbP8EzJdoJ), especially for mobile devices

<!--more-->

### HTTP content on an HTTPS page

When you’re serving your pages via HTTPS there can still be some non-encrypted HTTP-requests happing in the background, like Images, CSS, Ajax etc. Reasons for this can be:

- Assets (CSS, Images) reside on a non-HTTPS CDN
- Embedding of content from other domains not under your control. (E.g. when embedding a Youtube-video, although the player itself can be requested over HTTPS, the actual video file will be delivered over HTTP.)

In these cases of “mixed content” browsers give the user feedback that not all of the content on the current page is being served securely.

### Dynamically adding and removing HTTP content on an HTTPS page

Our web applications usually don’t reload the whole page when the user navigates to a different subpage. Rather we use Ajax-requests to inject content dynamically into the existing page, to deliver a smoother user experience.

Therefore I was interested in how different browsers react when loading HTTP content into an already loaded HTTPS page (hint: works in Chrome only).

### Browser Feedback on Mixed Content

The following is a brief comparison table of how browsers react when loading HTTP content into an HTTPS page.
Most notably IE8 (and 7 I think, but don’t bother) shows a modal warning whenever HTTP content is loaded!
On the other hand Google Chrome is the only browser which re-enables the HTTPS-indication when dynamically loaded HTTP content is removed from the page and history.pushState() is called.

In the table click on the small images to see screenshots.
To summarize: you can use mixed HTTP/HTTPS content if you don’t care about IE8.

<style><!--
table.comparison { width: 100%; }
table.comparison th { font-weight: bold; }
table.comparison th:first-child, table.comparison td:first-child { white-space: nowrap; }
table.comparison th, table.comparison td { padding: 2px 10px; text-align: left; border: 1px solid black; } table.comparison img { max-width: 40px !important; max-height: 30px !important; margin: 0 !important; display: inline-block !important; margin-left: 10px !important; vertical-align: middle !important; }
--></style>

<table class="comparison">
<tbody>
<tr>
<th></th>
<th>HTTPS-indication</th>
<th>HTTPS-indication vanishes when loading HTTP-content</th>
</tr>
<tr>
<td>Chrome 26</td>
<td>yes <a href="/img/posts/2013/chrome26-1.png"><img alt="" src="/img/posts/2013/chrome26-1.png"></a></td>
<td>becomes orange <a href="/img/posts/2013/chrome26-2.png"><img alt="" src="/img/posts/2013/chrome26-2.png"></a><br>
(becomes green again when removing HTTP-content)</td>
</tr>
<tr>
<td>Safari 6</td>
<td>yes <a href="/img/posts/2013/safari6-1.png"><img alt="" src="/img/posts/2013/safari6-1.png"></a></td>
<td>yes <a href="/img/posts/2013/safari6-2.png"><img alt="" src="/img/posts/2013/safari6-2.png"></a></td>
</tr>
<tr>
<td>Firefox 20</td>
<td>yes <a href="/img/posts/2013/firefox20-1.png"><img alt="" src="/img/posts/2013/firefox20-1.png"></a></td>
<td>yes <a href="/img/posts/2013/firefox20-2.png"><img alt="" src="/img/posts/2013/firefox20-2.png"></a></td>
</tr>
<tr>
<td>Opera 12</td>
<td>yes <a href="/img/posts/2013/opera12-1.png"><img alt="" src="/img/posts/2013/opera12-1.png"></a></td>
<td>yes <a href="/img/posts/2013/opera12-2.png"><img alt="" src="/img/posts/2013/opera12-2.png"></a></td>
</tr>
<tr>
<td>IE 8</td>
<td>yes <a href="/img/posts/2013/ie8-1.png"><img alt="" src="/img/posts/2013/ie8-1.png"></a></td>
<td>yes <a href="/img/posts/2013/ie8-3.png"><img alt="" src="/img/posts/2013/ie8-3.png"></a><br>
(plus a modal dialog <a href="/img/posts/2013/ie8-2.png"><img alt="" src="/img/posts/2013/ie8-2.png"></a>)</td>
</tr>
<tr>
<td>IE 9</td>
<td>yes <a href="/img/posts/2013/ie9-1.png"><img alt="" src="/img/posts/2013/ie9-1.png"></a></td>
<td>yes <a href="/img/posts/2013/ie9-2.png"><img alt="" src="/img/posts/2013/ie9-2.png"></a></td>
</tr>
<tr>
<td>IE 10</td>
<td>yes <a href="/img/posts/2013/ie10-1.png"><img alt="" src="/img/posts/2013/ie10-1.png"></a> <a href="/img/posts/2013/ie10metro-1.png"><img alt="" src="/img/posts/2013/ie10metro-1.png"></a></td>
<td>yes <a href="/img/posts/2013/ie10-2.png"><img alt="" src="/img/posts/2013/ie10-2.png"></a> <a href="/img/posts/2013/ie10metro-2.png"><img alt="" src="/img/posts/2013/ie10metro-2.png"></a></td>
</tr>
<tr>
<td>Android 2.3</td>
<td>yes <a href="/img/posts/2013/android23-1.png"><img alt="" src="/img/posts/2013/android23-1.png"></a></td>
<td>no</td>
</tr>
<tr>
<td>iOS 6.1</td>
<td>yes <a href="/img/posts/2013/ios61-1.png"><img alt="" src="/img/posts/2013/ios61-1.png"></a></td>
<td>yes <a href="/img/posts/2013/ios61-2.png"><img alt="" src="/img/posts/2013/ios61-2.png"></a></td>
</tr>
</tbody>
</table>
