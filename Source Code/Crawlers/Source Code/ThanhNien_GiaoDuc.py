import scrapy
from scrapy.http.request import Request

MAX_PAGES = 90


class ThanhNienGiaoDucSpider(scrapy.Spider):
    name = 'ThanhNienGiaoDucCrawler'
    file_id = 1

    def start_requests(self):
        urls = []

        for i in range(1, MAX_PAGES):
            url = 'https://thanhnien.vn/giao-duc/trang-' + str(i) + '.html'
            urls.append(url)

        for url in urls:
            request = Request(url, callback=self.parse)
            yield request

    def parse(self, response):
        urls = []

        for item in response.css('.zone--timeline .relative .story'):
            url = 'https://thanhnien.vn' + \
                item.css('h2 a::attr(href)').extract()[0]
            urls.append(url)

        for url in urls:
            request = Request(url, callback=self.parse_details)
            yield request

    def parse_details(self, response):
        content = ''
        paragraphs = response.xpath('//div[@id="abody"]/div/text()').extract()

        for paragraph in paragraphs:
            content += paragraph

        content = content.strip()

        if (len(content) > 10):
            file_name = 'ThanhNien/GiaoDuc/' + str(self.file_id) + '.txt'
            output_file = open(file_name, "w", encoding="utf-16")
            output_file.write(content)
            output_file.close()

            self.file_id += 1
