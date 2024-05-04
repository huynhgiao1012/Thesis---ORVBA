import {View, Text, ScrollView, Image} from 'react-native';
import React from 'react';
import Header2 from '../../common/Header2';
import {themeColors} from '../../common/theme';

export default function MaintenanceProcess() {
  const B = props => (
    <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>
      {props.children}
    </Text>
  );
  const B2 = props => (
    <Text
      style={{
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: themeColors.primaryColor2,
        fontSize: 17,
      }}>
      {props.children}
    </Text>
  );
  return (
    <View style={{flex: 1}}>
      <Header2 name="Maintenance Process" />
      <ScrollView>
        <View style={{backgroundColor: themeColors.white, padding: 20}}>
          <Text
            style={{
              color: themeColors.primaryColor2,
              fontWeight: 'bold',
              fontSize: 22,
              textAlign: 'center',
            }}>
            Quy trình bảo dưỡng xe ô tô là gì? Các bước thực hiện như thế nào?
          </Text>
          <Text
            style={{
              color: themeColors.gray60,
              fontWeight: 'bold',
              fontSize: 14,
              paddingVertical: 10,
              textAlign: 'right',
              fontStyle: 'italic',
            }}>
            {new Date().toLocaleString()}
          </Text>
          <Image
            source={require('../../assets/process.jpg')}
            style={{width: '100%', height: 200, marginBottom: 10}}
          />
          <Text
            style={{
              color: themeColors.black,
              fontWeight: '400',
              fontSize: 15,
              textAlign: 'justify',
              fontStyle: 'italic',
            }}>
            Quy trình bảo dưỡng xe ô tô là trình tự thực hiện các công việc như
            thay thế 1 số chi tiết phụ tùng hoặc vệ sinh, phục hồi lại khả năng
            làm việc của 1 số chi tiết nhằm nâng cao tuổi thọ, đảm bảo an toàn,
            tăng hiệu suất hoạt động của xe ô tô. Các nhà sản xuất xe ô tô đã
            xây dựng 1 quy trình tiêu chuẩn về bảo dưỡng cho xe ô tô để đảm bảo
            chất lượng kỹ thuật và đồng thời tiết kiệm tối đa thời gian bảo
            dưỡng giúp khách hàng không phải chờ đợi lâu hơn nữa việc tiết kiệm
            thời gian bảo dưỡng cũng giúp làm giảm tiền nhân công bảo dưỡng đáng
            kể.
          </Text>
          <Text
            style={{
              color: themeColors.primaryColor4,
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'justify',
            }}>
            Quy trình sửa chữa bảo dưỡng ô tô đúng chuẩn
          </Text>
          <Text style={{color: themeColors.black, textAlign: 'justify'}}>
            <B>– Bước 1: Tiếp nhận và kiểm tra ô tô cần bảo dưỡng</B> {'\n'}Khi
            bạn lái xe đến trung tâm sửa chữa sẽ có trưởng trung tâm ra tiếp
            nhận xe đồng thời sẽ hỏi bạn về những yêu cầu khi bảo dưỡng cũng như
            những biểu hiện lạ trên xe trong quá trình vận hành. Tiếp đến những
            nhân viên trong trung tâm sẽ tiến hành kiểm tra các lỗi, mức độ an
            toàn, hoạt động của những thiết bị trên xe. Cùng với đó sẽ có nhân
            viên ghi chép lại những lỗi cần sửa vào biên bản giao cho bạn.{' '}
            {'\n'}
            <B>– Bước 2: Đàm phán với khách hàng</B> {'\n'}Bạn tiếp nhận tờ giấy
            kiểm tra và được nhân viên thông báo những lỗi cần được sửa chữa bảo
            dưỡng. Sau khi thông báo xong bạn sẽ được nhân viên tư vấn những
            hạng mục cần sửa chữa và báo giá bảo dưỡng xe, tiền công,.. {'\n'}
            <B>– Bước 3: Tiếp nhận và tiến hành sửa chữa bảo dưỡng ô tô</B>{' '}
            {'\n'}Sau khi nhận được sự đồng ý thì những nhân viên trong trung
            tâm sẽ tiến hành sửa chữa và thay thế phụ tùng ô tô. Khi kết thúc
            việc sửa chữa bảo dưỡng xe thì trưởng trung tâm sẽ trực tiếp kiểm
            tra và chạy thử trước khi làm thủ tục trả xe cho bạn. {'\n'}
            <B>– Bước 4: Kiểm tra và giao xe</B> {'\n'}Bạn kiểm tra lại tình
            trạng của chiếc xe, nếu đã ưng ý thì sẽ tiến hành thanh toán các chi
            phí như đã thỏa thuận trước đó. Nhân viên lau dọn lại chiếc xe và
            bạn sẽ được trưởng trung tâm bàn giao xe cũng như cung cấp số điện
            thoại để gọi trong trường hợp cần thiết. {'\n'}
            <B>– Bước 5: Chăm sóc khách hàng</B>
          </Text>
          <Image
            source={require('../../assets/process2.jpg')}
            style={{
              width: '100%',
              height: 280,
              marginVertical: 10,
              borderColor: '#f8f8f8',
              borderWidth: 2,
              borderRadius: 5,
            }}
          />
          <Text
            style={{
              color: themeColors.primaryColor4,
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'justify',
            }}>
            Quy trình bảo dưỡng xe ô tô theo số km{' '}
          </Text>
          <Text style={{color: themeColors.black, textAlign: 'justify'}}>
            Ngoài quy trình bảo dưỡng ô tô nói chung cho bất cứ dòng xe ô tô nào
            thì lại có các quy trình bảo dưỡng xe ô tô riêng cho từng cấp độ hay
            còn gọi là quy trình bảo dưỡng xe ô tô theo km. Mà cấp bảo dưỡng của
            xe ô tô cơ bản có 4 cấp gồm có:
            {'\n'}- Bảo dưỡng cấp 1 là định kỳ 5000 km hoặc 3 tháng
            {'\n'}- Bảo dưỡng cấp 2 là định kỳ 10000 km hoặc 6 tháng
            {'\n'}- Bảo dưỡng cấp 3 là định kỳ 20000 km hoặc 12 tháng
            {'\n'}- Bảo dưỡng cấp 1 là định kỳ 40000 km hoặc 24 tháng {'\n'}
            {'\n'}Sau đây chúng tôi sẽ giới thiệu chi tiết quy trình bảo dưỡng
            xe ô tô theo từng cấp như sau:{'\n'}
            {'\n'}
            <B2>Quy trình bảo dưỡng xe ô tô cấp 1</B2>
            {'\n'}
            <B>Bước 1:</B> Đưa xe ô tô vào cầu, kiểm tra tổng thể bên ngoài xe,
            hệ thống điện thân xe, hệ thống chiếu sáng, khoang động cơ của xe,
            bình ắc quy của xe, các hệ thống nước làm, các loại dầu, nước rửa
            kính, kiểm tra rò gỉ nếu không có gì bất thường thì bổ xung các loại
            nước, các loại dầu cho xe
            {'\n'}
            <B>Bước 2:</B> Kích xe lên cầu, kiểm tra hệ thống gầm xe, hệ thống
            lái, hệ thống phanh, kiểm tra lốp, kiểm tra các rò gỉ ở động cơ, hộp
            số, lái, kiểm tra má phanh, moay ơ … lưu ý kiểm tra khi động cơ tắt
            máy
            {'\n'}
            <B>Bước 3:</B> Tiếp theo tiến hành xả dầu động cơ ra, lấy thiết bị
            đựng dầu, tháo nút xả dầu động cơ ra, khi dầu động cơ xả hết tiến
            hành lắp nút dầu động cơ lại
            {'\n'}
            <B>Bước 4:</B> Hạ cầu nâng xuống, tiến hành đổ dầu động cơ vào động
            cơ, dựa vào thông số dung tích dầu động cơ để đổ dầu cho chính xác
            khi đổ dầu cần tiến hành thăm dầu động cơ cho chính xác
            {'\n'}
            <B>Bước 5:</B> Nổ máy kiểm tra xe lại lần cuối đặc biệt tại vị nút
            xả dầu có bị rò gỉ dầu ra không. Sau đó tiến hành reset lại bảo
            dưỡng cho xe ô tô
            {'\n'}
            <B>Bước 6:</B> Sau khi đã hoàn thiện toàn bộ các công việc của phần
            bảo dưỡng cấp 1 cho xe ô tô thì công đoạn cuối cùng là tiến hành rửa
            xe và giao xe cho khách hàng {'\n'}
            <B2>Quy trình bảo dưỡng xe ô tô cấp 2</B2>
            {'\n'}Với quy trình bảo dưỡng xe ô tô cấp 2 phải làm toàn bộ quy
            trình bảo dưỡng cấp 1 của xe tuy nhiên trong lúc tháo nút xả dầu
            động cơ thì cần tháo luôn cả lọc động cơ và thay bằng lọc dầu động
            cơ mới. Quy trình thay lọc dầu động cơ như sau
            {'\n'}
            <B>Bước 1:</B> Tháo lọc dầu động cơ bằng vam tháo lọc chuyên dụng
            theo chiều ngược chiều kim đồng hồ
            {'\n'}
            <B>Bước 2:</B> Lấy lọc dầu động cơ mới, lưu ý lọc này phải có gioăng
            làm kín trước khi thay lọc mới cần bôi thêm ít dầu lên gioăng và đổ
            1 chút dầu mới vào trong cốc lọc dầu. sau đó tiến hành lắp lọc mới
            vào
            {'\n'}
            <B>Bước 3:</B> Lắp lọc dầu động cơ mới phải tiến hành vặn thật chặt
            bằng tay theo cùng chiều kim đồng hồ. Khi kiểm tra xe lần cuối cần
            kiểm tra thêm vị trí thay lọc mới có bị rò gỉ dầu không {'\n'}
            <B2>Quy trình bảo dưỡng xe ô tô cấp 3</B2>
            {'\n'}
            Với quy trình bảo dưỡng xe ô tô cấp 3 cũng vẫn phải làm toàn bộ quy
            trình bảo dưỡng cấp 2 của xe nhưng phải làm thêm các hạng mục như
            thay lọc gió động cơ, thay lọc gió điều, bảo dưỡng phanh. Việc thay
            lọc gió động cơ và lọc gió điều hòa của xe khá đơn giản nên chúng
            tôi sẽ không nêu chi tiết quy trình bảo dưỡng của 2 mục này, chúng
            tôi sẽ hướng dẫn bạn quy trình bảo dưỡng phanh xe ô tô
            {'\n'}
            <B>Bước 1:</B> Hạ cầu xuống, tháo ốc lốp tại 4 bánh xe ô tô, kích
            cầu lên để đưa lốp xe ô tô ra ngoài.
            {'\n'}
            <B>Bước 2:</B> Tháo má phanh ra khỏi cụm phanh, sau đó tháo cụm
            phanh ra khỏi đĩa phanh
            {'\n'}
            <B>Bước 3:</B> Tiến hành vệ sinh bôi mỡ cho ắc phanh, suốt phanh,
            nhám lại đĩa phanh và má phanh
            {'\n'}
            <B>Bước 4:</B> Lắp lại các chi tiết theo trình tự ngược lại {'\n'}
            <B2>Quy trình bảo dưỡng xe ô tô cấp 4</B2> {'\n'}
            Quy trình bảo dưỡng xe ô tô cấp 4 là quy trình bảo dưỡng cấp lớn
            nhất đối với xe ô tô, nên công việc cần làm cũng nhiều nhất. Quy
            trình bảo dưỡng xe ô tô cấp 4 cũng vẫn phải làm toàn bộ quy trình
            bảo dưỡng cấp 3 của xe nhưng ngoài ra phải làm thêm 1 số các hạng
            mục khác như thay dầu hộp số, thay dầu cầu, thay lọc nhiên liệu,
            thay bugi, thay nước làm mát, thay dầu phanh.
          </Text>
          <Text
            style={{
              color: 'red',
              fontStyle: 'italic',
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Liên hệ tư vấn dịch vụ & ứng dụng
          </Text>
          <Text
            style={{
              color: 'black',
              fontStyle: 'italic',
              textAlign: 'left',
              fontSize: 15,
            }}>
            Phone: 0832011697
            {'\n'}Email: DAO@gmail.com
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
