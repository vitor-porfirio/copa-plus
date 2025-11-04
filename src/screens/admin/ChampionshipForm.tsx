// src/screens/admin/ChampionshipForm.tsx
import { Layout, Input, Button, Text, CheckBox, Icon, Spinner } from '@ui-kitten/components';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createNewChampionship } from '../../store/slices/championshipSlice';
import { IChampionship } from '../../types/models';

interface ChampionshipFormProps {
  onSuccess: () => void;
}

const ChampionshipForm: React.FC<ChampionshipFormProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.championship);

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [hasCategories, setHasCategories] = useState(true);
  const [logoUrl, setLogoUrl] = useState('');
  const [formError, setFormError] = useState('');

  const isLoading = status === 'loading';

  const handleSubmit = () => {
    setFormError('');
    if (!title || !startDate) {
      setFormError('Título e Data de Início são obrigatórios.');
      return;
    }

    // Simulação de validação de data (muito básica)
    if (!startDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      setFormError('O formato da data deve ser AAAA-MM-DD.');
      return;
    }

    const newChampionshipData: Omit<IChampionship, 'id' | 'teams' | 'games' | 'categories'> = {
      title,
      startDate,
      hasCategories,
      logoUrl: logoUrl || undefined,
    };

    dispatch(createNewChampionship(newChampionshipData))
      .unwrap()
      .then(() => {
        onSuccess();
      })
      .catch((err: string) => {
        setFormError(err);
      });
  };

  return (
    <Layout style={styles.container}>
      <Text category="h5" style={styles.header}>
        Criar Novo Campeonato (US002)
      </Text>

      <Input
        label="Título do Campeonato"
        placeholder="Ex: Campeonato de Férias 2026"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Input
        label="Data de Início (AAAA-MM-DD)"
        placeholder="Ex: 2026-01-15"
        value={startDate}
        onChangeText={setStartDate}
        style={styles.input}
      />

      <Input
        label="URL do Logo (Opcional)"
        placeholder="https://..."
        value={logoUrl}
        onChangeText={setLogoUrl}
        style={styles.input}
      />

      <CheckBox checked={hasCategories} onChange={setHasCategories} style={styles.checkbox}>
        O campeonato terá categorias (Ex: Adulto, Sub-17)?
      </CheckBox>

      {(formError || error) && (
        <Text style={styles.errorText} status="danger">
          {formError || error}
        </Text>
      )}

      <Button
        style={styles.button}
        onPress={handleSubmit}
        disabled={isLoading}
        accessoryLeft={isLoading ? () => <Spinner size="small" status="basic" /> : undefined}
      >
        {isLoading ? 'Criando...' : 'Criar Campeonato'}
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  checkbox: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default ChampionshipForm;
