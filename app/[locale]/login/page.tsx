import { Background } from '@/components/login/Background';
import { Form } from '@/components/login/Form';
import { Header } from '@/components/login/Header';
import { Panel } from '@/components/login/Panel';

export default function LoginPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <Background>
      <Panel>
        <Header />
        <Form />
      </Panel>
    </Background>
  );
}
