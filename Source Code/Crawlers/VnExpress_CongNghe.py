import scrapy
from scrapy.http.request import Request

MAX_PAGES = 90

class VnExpressCongNgheSpider(scrapy.Spider):
    name = 'VnExpressCongNgheCrawler'
    file_id = 1

    def start_requests(self):
        urls = []

        for i in range(1, MAX_PAGES):
            url = 'https://vnexpress.net/so-hoa/p' + str(i)
            urls.append(url)

        for url in urls:
            request = Request(url, callback=self.parse)
            yield request

    def parse(self, response):
        urls = []

        for item in response.css('.list-news-subfolder .item-news'):
            url = item.css('.title-news a::attr(href)').extract()[0]
            urls.append(url)

        for url in urls:
            request = Request(url, callback=self.parse_details)
            yield request

    def parse_details(self, response):
        content = ''
        paragraphs = response.xpath('//article[@class="fck_detail"]/p/text()').extract()

        for paragraph in paragraphs:
            content += paragraph

        content = content.strip()
        
        if (len(content) > 10):
            file_name = 'VnExpress/CongNghe/' + str(self.file_id) + '.txt'
            output_file = open(file_name, "w", encoding="utf-8")
            output_file.write(content)
            output_file.close()

            self.file_id += 1