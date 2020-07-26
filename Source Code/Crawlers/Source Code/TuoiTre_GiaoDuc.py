import scrapy
from scrapy.http.request import Request

MAX_PAGES = 90


class TuoiTreGiaoDucSpider(scrapy.Spider):
    name = 'TuoiTreGiaoDucCrawler'
    file_id = 1

    def start_requests(self):
        urls = []

        for i in range(1, MAX_PAGES):
            url = 'https://tuoitre.vn/giao-duc/trang-' + str(i) + '.htm'
            urls.append(url)

        for url in urls:
            request = Request(url, callback=self.parse)
            yield request

    def parse(self, response):
        urls = []

        for item in response.css('.list-news-content .news-item'):
            url = 'https://tuoitre.vn' + \
                item.css('.title-news > a::attr(href)').extract()[0]
            urls.append(url)

        for url in urls:
            request = Request(url, callback=self.parse_details)
            yield request

    def parse_details(self, response):
        content = ''
        paragraphs = response.xpath(
            '//div[@id="main-detail-body"]/p/text()').extract()

        for paragraph in paragraphs:
            content += paragraph

        content = content.strip()

        if (len(content) > 10):
            file_name = 'TuoiTre/GiaoDuc/' + str(self.file_id) + '.txt'
            output_file = open(file_name, "w", encoding="utf-16")
            output_file.write(content)
            output_file.close()

            self.file_id += 1
