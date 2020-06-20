import React, { Component } from 'react'
import Sample from './Sample'
import axios from 'axios'

const API_ADDRESS = 'http://localhost:5000'

class Main extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            samples: [
                {
                    id: 1,
                    title: 'Nhà khoa học Nga tự làm "chuột bạch" thử vắc-xin Covid-19',
                    summary: 'Một nhóm nhà khoa học ở Nga đã tự thử vắc-xin Covid-19 trên chính cơ thể họ và bước đầu đạt được kết quả khả quan khi đã có kháng thể trong người.',
                    content: 'RT ngày 22/5 đưa tin, các nhà dịch tễ học ở Nga đã tiến hành thử nghiệm không chính thức đầu tiên vắc-xin Covid-19 trên chính cơ thể họ và bước đầu cho thấy có hiệu quả.\n\nĐây là các nhà khoa học, nhà nghiên cứu thuộc Trung tâm nghiên cứu quốc gia về dịch tễ học và vi sinh Nga. Họ cho biết những người tham gia thử vắc-xin đã có kháng thể trong người và chưa có tác dụng phụ. Theo giám đốc của trung tâm này Alexander Ginzburg, đây là một bước tiến hướng tới việc thử nghiệm được có thể cấp phép chính thức.\n\n"Chúng tôi sẽ coi đây là thành công nếu chúng tôi nhận được sự cho phép các các quan chức Bộ Y tế để thử nghiệm chính thức", ông Ginzburg nói với Tass.\n\nTheo ông Ginzburg, các nhà khoa học tự tiêm vắc-xin vào người không chỉ để chứng minh phát minh của họ hiệu quả mà còn để tự bảo vệ bản thân họ khỏi virus SARS-CoV-2, để họ có thể tiếp tục quá trình nghiên cứu sâu hơn. Tuy nhiên, ông Ginzburg không nêu rõ số lượng người đã thử vắc-xin, nhưng ông mô tả rằng họ đều "còn sống, khỏe mạnh và hạnh phúc".\n\nÔng Ginzburg ước tính sẽ mất 6 tháng để toàn bộ người Nga có thể sử dụng vắc-xin một khi sản phẩm này chính thức được phê duyệt cho dùng rộng rãi. Nếu mọi việc đi theo đúng kế hoạch, ông hy vọng vắc-xin sẽ được thông qua vào cuối mùa hè. Ông cho rằng những người đầu tiên được tiêm vắc-xin nên là các nhân viên y tế tuyến đầu và người cao tuổi.\n\nTrước đó, Phó Thủ tướng Nga Tatyana Golikova cho biết có 47 loại vắc-xin Covid-19 đang được phát triển tại quốc gia này.\n\nTheo cập nhật mới nhất, Nga hiện có 335.882 ca Covid-19, tăng 9.434 ca so với hôm qua. Số người chết vì dịch ở nước này là 3.388.',
                    url: 'https://dantri.com.vn/the-gioi/nha-khoa-hoc-nga-tu-lam-chuot-bach-thu-vacxin-covid-19-20200523160834172.htm',
                    source: 'https://dantri.com.vn'
                },
                {
                    id: 2,
                    title: 'Nam Định - Hoàng Anh Gia Lai: Trận đấu đặc biệt của bóng đá Việt',
                    summary: 'Gần 500 cảnh sát sẽ có mặt để bảo vệ trận đấu đặc biệt của bóng đá Việt Nam - trận đấu đầu tiên có sự góp mặt của khán giả từ khi dịch COVID-19 bùng phát.',
                    content: 'Chiều nay 23-5, trận khai mạc Cúp quốc gia 2020 giữa Dược Nam Hà Nam Định - Hoàng Anh Gia Lai (Bóng đá TV truyền hình trực tiếp lúc 18h) sẽ diễn ra trên sân Thiên Trường (Nam Định).\n\nÔng Trần Anh Tú - chủ tịch HĐQT Công ty VPF - cho biết không tính Giải vô địch Belarus vẫn mở cửa cho khán giả vào sân trong mùa dịch, trận Nam Định - HAGL là một trong những giải đấu đầu tiên trên thế giới mở cửa trở lại với khán giả sau khi dịch COVID-19 diễn ra.\n\nThắt chặt an ninh, kiểm tra y tế kỹ càng\n\nVì ý nghĩa đặc biệt quan trọng, trận Nam Định - HAGL đã vượt ra khuôn khổ một trận bóng đá thông thường. Nó là sự khẳng định của thể thao và Chính phủ Việt Nam quyết tâm khống chế, đẩy lùi dịch COVID-19. Sự có mặt của 10.000 khán giả trên sân vận động VĐ Thiên Trường vì thế không chỉ đem lại niềm vui cho cầu thủ, mà còn là dấu hiệu cho thấy những sinh hoạt đời thường đã trở lại với người dân.\n\nDù vậy, ban tổ chức (BTC) trận đấu đã có nhiều cuộc họp trước trận đấu để đảm bảo công tác an ninh, an toàn. Ông Trần Thái Toán - giám đốc điều hành CLB Nam Định - cho biết có 450 - 500 cảnh sát sẽ tham gia bảo vệ trận đấu. Về công tác y tế, 15 cửa của sân vận động Thiên Trường sẽ có 15 cán bộ y tế đứng gác để đo thân nhiệt cho cổ động viên đến sân. Tất cả khán giả không đeo khẩu trang hoặc có thân nhiệt trên 37,5 độ, những người ho, sốt, trẻ em sẽ không được vào sân.\n\nVới 10.000 vé được bán ra, sự giãn cách của CĐV trên sân Thiên Trường với sức chứa 20.000 chỗ ngồi là không quá xa. Vì vậy, BTC khuyến cáo CĐV đeo khẩu trang suốt thời gian xem trận đấu, rửa tay liên tục và thực hiện nghiêm quy định của BTC sân để đảm bảo an toàn cho mình và mọi người.\n\nÔng Nguyễn Hồng Sơn, trợ lý tổng giám đốc Công ty VPF và là giám sát trận đấu, nói với Tuổi Trẻ ngày 21-5 BTC đã có cuộc họp về công tác chuẩn bị. Ông Sơn nói: "Trận Nam Định - HAGL không chỉ là trận khai mạc Cúp quốc gia, ghi dấu sự trở lại của khán giả ở các giải chuyên nghiệp VN từ khi COVID-19 diễn ra mà còn là trận đấu lịch sử cho thấy nỗ lực chống dịch của VN. Sân Thiên Trường được chọn bởi người dân ở đây yêu mến bóng đá và là sân có số CĐV đông nhất cả nước (thống kê của mùa giải 2019).\n\nCông tác kiểm soát vé sẽ được thắt chặt để đảm bảo đúng số khán giả mua vé được vào sân. Về y tế, ngoài một xe cứu thương bên trong sân, còn có một xe bên ngoài SVĐ để phục vụ các tình huống khẩn cấp. BTC đã bố trí các quầy bán khẩu trang quanh sân. Thậm chí một số khẩu trang, nước sát khuẩn cũng đã được BTC chuẩn bị để phát miễn phí với số lượng nhất định cho CĐV. Tất cả vì một trận đấu thành công, an toàn".\n\nKhán giả háo hức chờ giờ bóng lăn\n\n15h30 chiều 22-5, BTC trận đấu đã bán vé cho người hâm mộ tại SVĐ Thiên Trường. Dù trời nắng nóng nhưng nhiều CĐV phải lặn lội từ các miền quê của Nam Định đến chờ chực mua vé. Và lạ lùng là chưa bao giờ trong tình cảnh chen lấn, mệt mỏi... nhưng cả CĐV và người bán vé đều rất háo hức, vui mừng.\n\nAnh Vũ Văn Hòa - nhà ở xã Trực Mỹ, huyện Trực Ninh - cho biết: "Nhà tôi cách sân 37km, 7h sáng nay tôi đã đến sân xem tình hình rồi về nhà. Chiều tôi lại đi xe máy lên từ 14h xếp hàng mua vé cho tôi và vợ. Bao năm nay, không trận nào của Nam Định trên sân Thiên Trường tôi bỏ sót. Trận này còn ý nghĩa hơn vì lâu lắm bóng đá mới lại có khán giả".\n\nKhông chỉ khán giả thành Nam háo hức, người hâm mộ cả nước cũng chờ đợi trận đấu này.\n\nSẽ là trận đấu hấp dẫn\n\nỞ trận lượt về V-League mùa rồi, HAGL với nhiều tuyển thủ quốc gia cùng lối đá đậm chất kỹ thuật đã khiến sân Thiên Trường chật cứng người hâm mộ. Và tất cả cùng mãn nhãn với kết quả 2-2.\n\nỞ lần gặp lại trong khuôn khổ Cúp quốc gia này, tính hấp dẫn vẫn không thuyên giảm trong màn đối đầu giữa Nam Định - CLB có lượng CĐV đông nhất, còn HAGL là đội bóng được mến mộ nhất cả nước. Trận này, ngoài việc có thể mất Văn Toàn vì chấn thương, HAGL chắc chắn thiếu vắng trung vệ Damir bởi lý do tương tự. Vắng chốt chặn quan trọng và cũng là cầu thủ cao nhất V-League mùa này (cao 1,96m), hàng thủ vốn chông chênh của HAGL nhiều khả năng sẽ vất vả trước lối chơi bóng bổng của Nam Định bởi khả năng đánh đầu lợi hại của Đỗ Merlo (cao 1,92m) - người từng 4 lần đoạt danh hiệu Vua phá lưới sau một thập niên chinh chiến ở V-League.\n\nTrước trận đấu, HLV Nguyễn Văn Dũng (Nam Định) nhận định: "Trong khi nhiều CLB buộc phải xả trại trong mùa dịch, HAGL vẫn luyện tập cùng nhau suốt 10 tuần qua. Điều này giúp HAGL nhỉnh hơn Nam Định về sức bền thể lực và gắn kết hơn trong lối chơi. Vì vậy, dù không có được đội hình mạnh nhất nhưng HAGL vẫn rất đáng gờm với lối chơi "gai góc, xù xì" dưới sự dẫn dắt bởi HLV Lee Tae Hoon. Theo tôi, đây sẽ là trận đấu hấp dẫn".\n\nHLV Park Hang Seo dự khán trận đấu\n\nTheo kế hoạch, HLV Park Hang Seo sẽ có mặt theo dõi trận đấu. Ngoài ra, BTC trận đấu cho biết lãnh đạo UBND tỉnh Nam Định, VPF, Liên đoàn bóng đá Việt Nam (VFF) cũng sẽ có mặt theo dõi trận đấu quan trọng này.',
                    url: 'https://thethao.tuoitre.vn/nam-dinh-hoang-anh-gia-lai-tran-dau-dac-biet-cua-bong-da-viet-20200523102737619.htm',
                    source: 'https://tuoitre.vn'
                },
                {
                    id: 3,
                    title: 'Phụ huynh "chạy bằng được" cho con vào trường công an',
                    summary: 'Bà Hoàng Thị Thành (cựu Chủ tịch Hội Nông dân huyện Quỳnh Nhai) khai khi không nói rõ số điểm cần nâng mà chỉ yêu cầu "để vào bằng được trường công an".',
                    content: 'Trong phiên xét hỏi chiều 23/5, bị cáo Hoàng Thị Thành cho biết sau khi suy nghĩ rất nhiều cho con về kỳ thi THPT 2018 đã trao đổi với Cầm Thị Bun Sọn vì từng là bạn bè học cùng nhau. Bà Thành sau đó nhờ Sọn nâng điểm cho con trai để đỗ đại học.\n\n"Tôi không nói cụ thể là phải nâng bao nhiêu điểm mà chỉ bảo chị Sọn áng chừng để con vào bằng được trường công an", bị cáo Thành nói và cho hay sau khi con được nâng 13,65 điểm ba môn Toán, Ngữ văn, Lịch sử đã cảm ơn bà Sọn 400 triệu đồng.\n\n"Căn cứ vào đâu bị cáo đưa 400 triệu đồng?", luật sư Bùi Việt Anh (bào chữa cho bà Thành) hỏi. Cựu Chủ tịch Hội Nông dân huyện Quỳnh Nhai đáp khi nhờ vả hai người không có thoả thuận về số tiền. Tuy nhiên không biết cảm ơn bao nhiêu cho đủ nên tự sắp xếp con số 400 triệu đồng.\n\nĐối chất sau đó bà Sọn thừa nhận được bà Thành cảm ơn 400 triệu đồng sau khi nâng điểm thành công cho con trai bà Thành. Bà không "mặc cả hay đòi hỏi gì" mà bà Thành tự nguyện. "Không phải tôi đòi 400 triệu đồng mới giúp như thông tin trước đó. Dù bà Thành đưa 100, 200 triệu đồng, tôi vẫn giúp vì nể nang. Con trai bà Thành đã thi trượt một năm", bà Sọn trình bày.\n\nBà Sọn sau đó còn nhận 40 triệu đồng để nâng thêm điểm môn Ngữ văn tự luận cho con trai bà Thành. Toàn bộ 440 triệu đồng nhận hối lộ, bà Sọn đã nộp cơ quan điều tra.\n\nTheo cáo trạng, bà Sọn bị truy tố về tội Nhận hối lộ và Lợi dụng chức vụ quyền hạn trong thi hành công vụ, bà Thành bị truy tố tội Đưa hối lộ.\n\nCông an bảo vệ điểm thi phủ nhận cáo buộc được chia tiền\n\nTheo cáo trạng, bị cáo Đinh Hải Sơn và Đỗ Khắc Hưng là hai cán bộ Công an tỉnh Sơn La được giao nhiệm vụ đảm bảo an ninh trật tự ở khu vực chấm thi. Trong thời gian thực hiện nhiệm vụ, Sơn nhận thông tin của hai thí sinh nên nhờ Nguyễn Thị Hồng Nga (chuyên viên phòng khảo thí) và Lò Văn Huynh (cựu trưởng Phòng Khảo thí) nâng điểm. Tối 30/6/2018, Sơn mở cửa cầu thang tầng một ở địa điểm chấm thi để bà Nga lấy chìa khoá vào phòng xử lý bài thi trắc nghiệm, rút bài sửa nâng điểm.\n\nTương tự, Đỗ Khắc Hưng nhận thông tin một thí sinh và nhờ bà Nga nâng điểm. Hưng tạo điều kiện cho bà Nga, Thuỷ, Sọn vào phòng xử lý bài thi trắc nghiệm để rút bài thi, sửa điểm. Tối 30/6/2018, biết không mở cửa cho nhóm của Nga tiếp tục vào rút bài, ông Hưng đã dán lại niêm phong cửa phòng xử lý bài thi trắc nghiệm để che giấu sai phạm.\n\nNgày 4/7/2018, ông Huynh sau khi thống nhất với bà Nga đã bồi dưỡng cho Hưng 100 triệu đồng. Ba ngày sau, ông Huynh đưa số tiền này ở trường THCS Quyết Thắng. Tuy nhiên tại cơ quan điều tra, ông Hưng không thừa nhận điều này.\n\nTrả lời tại toà chiều 22/5, ông Huynh phủ nhận nội dung trên của cáo trạng. Ông cho hay có bàn bạc, định bồi dưỡng cho Hưng nhưng bà Nga nói "có suất rồi" nên không đưa tiền nữa. Ông Huynh hiểu suất ở đây là suất gửi các thí sinh nhờ nâng điểm.\n\n"Bị cáo lấy tiền đâu ra để bồi dưỡng?", chủ toạ truy vấn. Bị cáo Huynh đáp nhận 300 triệu đồng tiền nâng điểm cho con trai bà Lò Thị Trường nên định trích ra để bồi dưỡng cho công an Hưng và Sơn. Ngày 30/6/2018, hai cán bộ công an này đã hỗ trợ tổ chấm thi mở cửa phòng chứa bài thi để rút bài sửa điểm.\n\nNgày mai, phiên toà tiếp tục làm việc.\n\nDự kiến trong một tuần từ ngày 21/5, TAND tỉnh Sơn La đưa 12 bị cáo ra xét xử liên quan việc sửa điểm 165 bài thi tốt nghiệp THPT quốc gia 2018 về các tội Lợi dụng chức vụ quyền hạn trong thi hành công vụ, Nhận hối lộ, Đưa hối lộ.',
                    url: 'https://vnexpress.net/phu-huynh-chay-bang-duoc-cho-con-vao-truong-cong-an-4104103.html',
                    source: 'https://vnexpress.net'
                },
                {
                    id: 4,
                    title: 'Nhà lãnh đạo Triều Tiên Kim Jong Un lại im ắng lạ thường',
                    summary: 'Nhà lãnh đạo Triều Tiên Kim Jong Un ít xuất hiện công khai trong 2 tháng qua, và tiếp tục vắng bóng thêm 3 tuần gần đây nhất trên báo chí nước này.',
                    content: 'Sự vắng bóng của ông Kim được chú ý khi Triều Tiên đang triển khai các biện pháp chống dịch bệnh do virus corona gây ra, dù nước này chưa xác nhận ca bệnh nào. Tháng trước cũng rộ lên nhiều tin đồn về sức khỏe của ông sau khi ông vắng mặt trong một sự kiện quan trọng của Triều Tiên.\n\nÔng Kim chỉ xuất hiện công khai 4 lần trong tháng 4 và 3 tuần của tháng 5, trong khi cùng thời gian này năm ngoái, ông xuất hiện 27 lần.\n\nKể từ khi lên nắm quyền năm 2011, khoảng thời gian ông ít xuất hiện công khai nhất là 21 ngày liên tục của năm 2017, theo tổng kết của Chad O’Carroll, CEO của Korea Risk Group, một tổ chức tại Seoul chuyên theo dõi về Triều Tiên.\n\n"Điều này không hề bình thường", O\'Carroll tuần này viết trên Twitter.\n\nLà nhà lãnh đạo có quyền lực gần như tuyệt đối với 25,5 triệu dân và có quyền quyết định số phận kho vũ khí hạt nhân, sức khỏe và nơi ở của ông Kim luôn được bên ngoài theo dõi để tìm bất kỳ dấu hiệu nào không bình thường.\n\nGiới chức Hàn Quốc nói rằng họ tin lý do ông Kim ít xuất hiện công khai trong thời gian này là do lo ngại tình hình COVID-19. Triều Tiên đã hoãn, hủy hoặc giảm quy mô các sự kiện đông người vì virus corona mới.\n\nKhi được hỏi về sự vắng mặt của ông Kim, Bộ Thống nhất Hàn Quốc hôm nay nói rằng họ đang theo dõi tình hình, nhưng nhấn mạnh rằng ông Kim vẫn hay vắng bóng như vậy.\n\nDẫn lời một quan chức Hàn Quốc giấu tên, báo JoongAng Ilbo nói rằng ông Kim có thể đang điều hành đất nước từ một khu nghỉ dưỡng yêu thích của ông ở Wonsan, thị trấn ven biển của Triều Tiên.\n\nNhưng có thể nhà lãnh đạo này đang tập trung thực hiện một số mục tiêu kinh tế và chính trị trong nước mà ông đã vạch ra trước khi xảy ra khủng hoảng COVID-19, bà Rachel Minyoung Lee, một chuyên gia phân tích tình báo từ nguồn mở về Triều Tiên trong chính phủ Mỹ, nhận định.\n\n"COVID-19 vẫn là mối bận tâm lớn của họ, nhưng thông tin về COVID-19 trên báo chí nhà nước Triều Tiên ít hơn trong tháng qua, nên tôi không thấy đó đang là mối bận tâm lớn của họ",  bà Lee nói.\n\nĐến hôm nay là tròn 3 tuần kể từ lần gần đây nhất báo chí nhà nước Triều Tiên đăng ảnh về việc ông Kim dự sự kiện đông người. Đó là lễ khánh thành một nhà máy phân bón hôm 1/5, chấm dứt chuỗi tin đồn về sức khỏe của ông sau khi ông vắng mặt suốt mấy tuần.\n\nKể từ đó, báo chí Triều Tiên chỉ thỉnh thoảng đăng tin về việc ông Kim gửi hay nhận điện ngoại giao, chứ chưa có hình ảnh nào cho thấy ông tham gia sự kiện đông người.',
                    url: 'https://www.tienphong.vn/the-gioi/nha-lanh-dao-trieu-tien-kim-jong-un-lai-im-ang-la-thuong-1661819.tpo',
                    source: 'https://www.tienphong.vn'
                },
            ],
            document: '',
            predictingCategory: '',
            showingResults: false
        }

        this.documentInput = React.createRef();
    }

    predictCategory = async (e) => {
        e.preventDefault()

        if (this.state.document !== '')
        {
            const response = await axios.post(API_ADDRESS, {
                document: this.state.document
            })
    
            if (response)
            {
                this.setState({
                    predictingCategory: response.data.predicting_category,
                    showingResults: true
                })
            }
        }
        else
        {
            this.documentInput.current.focus();
        }
    }

    selectSample = sampleId => {
        const index = this.state.samples.findIndex(sample => sample.id === sampleId)
        const document = this.state.samples && this.state.samples[index] && this.state.samples[index].content
        
        this.setState({
            document,
            showingResults: false
        })
    }

    changeDocument = e => {
        this.setState({
            document: e.target.value
        })
    }

    resetDocument = () => {
        this.setState({
            document: '',
            showingResults: false
        })
    }

    render()
    {
        return (
            <main>
                {
                    !this.state.showingResults &&
                    <section className="input-section">
                        <h3 className="input-section__title">Nội dung văn bản</h3>
                        <form onSubmit={ this.predictCategory }>
                            <textarea placeholder="Nhập nội dung văn bản cần phân loại" rows={ 15 } resizable="false" autofocus="true" value={ this.state.document } onChange={ this.changeDocument } ref={this.documentInput}></textarea>
                            
                            <button type="submit" className="button" style={{ width: '100%' }}>Phân loại văn bản</button>
                        </form>
                    </section>
                }

                {
                    this.state.showingResults &&
                    <section className="results-section">
                        <h3 className="results-section__title">Kết quả phân loại</h3>
                        <div className="results">
                            <p className="results__text">Chủ đề được chọn cho văn bản trên là</p>
                            <p className="results__keyword">{ this.state.predictingCategory }</p>

                            <button className="button" onClick={ this.resetDocument }><i className="fas fa-redo"></i>&nbsp;&nbsp;Thử lại với văn bản khác</button>
                        </div>
                    </section>
                }

                
                <section className="samples-section">
                    <h3 className="samples-section__title">Văn bản mẫu</h3>

                    <div className="samples">
                    {
                        this.state.samples.map(sample => (
                            <Sample sample={ sample } key={ sample.id } onSelect={ () => this.selectSample(sample.id) } />
                        ))
                    }
                    </div>
                </section>
            </main>
        )
    }
}


export default Main